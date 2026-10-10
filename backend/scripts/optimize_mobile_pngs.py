"""Losslessly recompress Spekvia mobile PNG assets.

The original is replaced only when Pillow produces a smaller valid PNG.
Run from the repository root with backend's virtual environment Python.
"""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image


REPO_ROOT = Path(__file__).resolve().parents[2]
ASSETS_ROOT = (REPO_ROOT / "mobile" / "assets").resolve()


def optimize_png(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    temporary = path.with_name(f".{path.name}.optimized.tmp")

    with Image.open(path) as image:
        image.load()
        save_options: dict[str, object] = {"format": "PNG", "optimize": True, "compress_level": 9}
        if "icc_profile" in image.info:
            save_options["icc_profile"] = image.info["icc_profile"]
        if "dpi" in image.info:
            save_options["dpi"] = image.info["dpi"]
        image.save(temporary, **save_options)

    after = temporary.stat().st_size
    if after < before:
        os.replace(temporary, path)
        return before, after

    temporary.unlink(missing_ok=True)
    return before, before


def main() -> None:
    if not ASSETS_ROOT.is_relative_to(REPO_ROOT):
        raise RuntimeError("Refusing to optimize assets outside the repository")

    total_before = 0
    total_after = 0
    changed = 0
    for path in sorted(ASSETS_ROOT.rglob("*.png")):
        before, after = optimize_png(path)
        total_before += before
        total_after += after
        changed += after < before

    saved_mb = (total_before - total_after) / (1024 * 1024)
    print(f"Optimized {changed} PNG files; saved {saved_mb:.2f} MB")


if __name__ == "__main__":
    main()
