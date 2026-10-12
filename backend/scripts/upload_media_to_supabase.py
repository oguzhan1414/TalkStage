"""Uploads the app's media (scenario videos + podcasts) to a PUBLIC Supabase Storage bucket.

Run from `backend/` with the venv active (needs SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in backend/.env):

    python scripts/upload_media_to_supabase.py --dry-run     # list what would be uploaded
    python scripts/upload_media_to_supabase.py               # create bucket (if needed) + upload

Layout inside the bucket mirrors what the app already asks for:
    media/videos/<scenario>/<file>.mp4     (from <repo>/videos)
    media/podcasts/<file>.mp3              (from backend/static/podcasts)
Public URL base for the app (EXPO_PUBLIC_MEDIA_BASE_URL):
    <SUPABASE_URL>/storage/v1/object/public/media

Safe to re-run: files that already exist with the same size are skipped.
"""
import argparse
import mimetypes
import sys
from pathlib import Path

import httpx
from dotenv import dotenv_values

BACKEND = Path(__file__).resolve().parent.parent
REPO = BACKEND.parent
BUCKET = "media"
UPLOAD_EXT = {".mp4", ".mp3", ".jpg", ".jpeg", ".png", ".webp"}

SOURCES = [
    (REPO / "videos", "videos"),
    (BACKEND / "static" / "podcasts", "podcasts"),
]


def collect() -> list[tuple[Path, str]]:
    files = []
    for root, prefix in SOURCES:
        if not root.exists():
            continue
        for p in sorted(root.rglob("*")):
            if p.is_file() and p.suffix.lower() in UPLOAD_EXT:
                files.append((p, f"{prefix}/{p.relative_to(root).as_posix()}"))
    return files


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    files = collect()
    total = sum(p.stat().st_size for p, _ in files)
    print(f"{len(files)} files, {total / 1e6:.1f} MB")
    if args.dry_run:
        for p, key in files[:10]:
            print("  ", key, f"{p.stat().st_size / 1e6:.1f} MB")
        print("   ...")
        return 0

    env = dotenv_values(BACKEND / ".env")
    base = (env.get("SUPABASE_URL") or "").rstrip("/")
    key = env.get("SUPABASE_SERVICE_ROLE_KEY") or ""
    if not base or not key:
        print("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing in backend/.env")
        return 1
    headers = {"Authorization": f"Bearer {key}", "apikey": key}

    with httpx.Client(timeout=300) as client:
        r = client.get(f"{base}/storage/v1/bucket/{BUCKET}", headers=headers)
        if r.status_code == 404 or (r.status_code == 400 and "not found" in r.text.lower()):
            r = client.post(f"{base}/storage/v1/bucket", headers=headers, json={"id": BUCKET, "name": BUCKET, "public": True})
            print("bucket create:", r.status_code, r.text[:120])
            if r.status_code >= 300:
                return 1
        elif r.status_code >= 300:
            print("bucket check failed:", r.status_code, r.text[:200])
            return 1
        else:
            print("bucket exists")

        uploaded = skipped = failed = 0
        for i, (p, key_path) in enumerate(files, 1):
            size = p.stat().st_size
            info = client.get(f"{base}/storage/v1/object/info/public/{BUCKET}/{key_path}", headers=headers)
            if info.status_code == 200:
                try:
                    if int(info.json().get("size", -1)) == size:
                        skipped += 1
                        continue
                except Exception:
                    pass
            ctype = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
            res = client.post(
                f"{base}/storage/v1/object/{BUCKET}/{key_path}",
                headers={**headers, "Content-Type": ctype, "x-upsert": "true", "cache-control": "max-age=31536000"},
                content=p.read_bytes(),
            )
            if res.status_code < 300:
                uploaded += 1
                print(f"[{i}/{len(files)}] ok   {key_path}")
            else:
                failed += 1
                print(f"[{i}/{len(files)}] FAIL {key_path}: {res.status_code} {res.text[:160]}")
        print(f"done: uploaded={uploaded} skipped={skipped} failed={failed}")
        print(f"public base: {base}/storage/v1/object/public/{BUCKET}")
        return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
