# Spekvia backend: VPS kurulumu (Docker + Caddy)

Hedef: Ubuntu 24.04 VPS (4 vCPU / 8 GB), alan adı `api.spekvia.com`, otomatik HTTPS/wss. Uygulama (FastAPI) Docker'da, Caddy önünde TLS'i çözer.
Gizli anahtarlar (`.env`) **asla** git'e girmez; sunucuda elle oluşturulur.

## 0. Elinde olması gerekenler
- Sunucunun IP adresi ve root parolası (sağlayıcı panelinde).
- `.env` değerlerin (`backend/.env`'deki anahtarlar). Sunucuya dosyayı kopyalamak yerine elle yapıştırırsın.

## 1. Bilgisayarında SSH anahtarı (bir kere)
PowerShell:
```
ssh-keygen -t ed25519 -C "spekvia-vps"
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@SUNUCU_IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```
Parolayı bir kez yazarsın, sonrası anahtarla girer.

## 2. İlk kurulum (root, bir kere)
Bilgisayarından betiği sunucuya at ve çalıştır:
```
scp backend\deploy\setup-server.sh root@SUNUCU_IP:/root/
ssh root@SUNUCU_IP "bash /root/setup-server.sh"
```
Betik: güncellemeler, güvenlik duvarı (22/80/443), fail2ban, otomatik güvenlik güncellemesi, Docker, `deploy` kullanıcısı. SSH ayarlarına dokunmaz.

## 3. Alan adı (DNS)
Alan adı sağlayıcında bir **A kaydı** ekle: `api` → `SUNUCU_IP` (TTL kısa olsun). `nslookup api.spekvia.com` IP'yi gösterene kadar bekle (genelde dakikalar). Caddy sertifikayı DNS çalışınca alır.

## 4. SSH'i sertleştir (kendini kilitleme!)
Önce yeni bir terminalde `ssh deploy@SUNUCU_IP` ile **girebildiğini doğrula** (anahtar 1. adımda root'a eklendi, 2. adımdaki betik `deploy`'a kopyaladı). Girebiliyorsan, **root'un açık terminalinde** (kapatma):
```
cat > /etc/ssh/sshd_config.d/00-hardening.conf <<'EOF'
PermitRootLogin no
PasswordAuthentication no
EOF
sshd -t && systemctl reload ssh
sshd -T | grep -E 'permitrootlogin|passwordauthentication'   # no / no yazmalı
```
(Dosya adı bilerek `00-`: sshd ilk okuduğu değeri kullanır, imajın kendi ayar dosyaları ezmesin.)
Sonra ikinci bir terminalde `ssh deploy@SUNUCU_IP` ile tekrar girebildiğini dene; girerse root terminalini kapatabilirsin. Bundan sonra root ile parolayla girilemez (sunucuyu yönetmek için `deploy` kullanıcısı yeter, gerekirse panelden konsolla root'a erişilir).

## 5. Kodu sunucuya al (GitHub deploy key, salt okunur)
Sunucuda `deploy` kullanıcısıyla:
```
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub
```
Çıkan satırı GitHub'da repo → Settings → Deploy keys → Add (**Allow write access kapalı**). Sonra:
```
printf 'Host github.com\n  IdentityFile ~/.ssh/github_deploy\n  IdentitiesOnly yes\n' >> ~/.ssh/config
git clone --filter=blob:none --sparse git@github.com:oguzhan1414/TalkStage.git /opt/spekvia/TalkStage
cd /opt/spekvia/TalkStage && git sparse-checkout set backend
```
(Yalnızca `backend` klasörü iner, repo'nun görselleri inmez.)

## 6. Gizli anahtarlar
```
cd /opt/spekvia/TalkStage/backend
cp .env.example .env
nano .env
```
Değerleri doldur (Supabase, Deepgram, Groq, OpenAI, Cartesia, RevenueCat...). `ENVIRONMENT=production`. Dosya izni: `chmod 600 .env`.

## 7. Başlat
```
cd /opt/spekvia/TalkStage/backend/deploy
echo "API_DOMAIN=api.spekvia.com" > .env
docker compose up -d --build
docker compose ps
```
Kendi bilgisayarından kontrol: `curl https://api.spekvia.com/health` → `{"status":"ok","environment":"production"}`.

## 8. Uygulamaya bağla
Mobilde `EXPO_PUBLIC_API_BASE_URL=https://api.spekvia.com` (WebSocket adresi otomatik `wss://` olur). `mobile/.env` ve EAS build ortamı değişkeni.

## 9. İlk ay ölçümleri (karar için veri)
Sunucuda:
```
docker stats --no-stream        # RAM / CPU
df -h /                         # disk
docker compose logs --tail=100 api
```
Bilgisayarında gecikme (5 kez):
```
curl -o NUL -s -w "dns %{time_namelookup}  baglanti %{time_connect}  tls %{time_appconnect}  ilk-bayt %{time_starttransfer}  toplam %{time_total}\n" https://api.spekvia.com/health
```
Akşam yoğun saatte de tekrarla. Hedef: ilk bayt < 0,25 sn.

## 10. Güncelleme
Yeni kod git'e gidince sunucuda:
```
bash /opt/spekvia/TalkStage/backend/deploy/update.sh
```

## Notlar
- Tek worker bilerek: sesli oturumlar süreç içi WebSocket, bazı sayaçlar bellekte. Ölçekleme gerekirse önce Redis (`REDIS_URL`).
- `allow_origins=["*"]` (CORS) mobil için sorun değil; web `/app` kullanılacaksa daralt.
- Sunucu beklenmedik şekilde kaybolursa: yeni VPS + bu adımlar ≈ 20 dakika. Veri Supabase'de, sunucuda kalıcı veri yok (Caddy sertifikası dışında).
- `docker system df` ayda bir bak; log dosyaları 10 MB x 5 ile sınırlı.
