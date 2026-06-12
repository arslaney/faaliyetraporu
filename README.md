# Faaliyet Raporu Üretici — AI Destekli (Vercel)

Endüstriyel Riskler UW çeyreklik faaliyet raporu platformu.
Excel yükle → AI metinleri yazsın (derin analiz + hedef takibi) → Word indir.

## Yapı
- `public/index.html` — Platformun tamamı (tek dosya)
- `api/rewrite.js`    — AI köprüsü (Anthropic'e sunucudan bağlanır, anahtar gizli kalır)

## KURULUM (tek seferlik, ~5 dk — TeklifVerisi ile aynı akış)

### 1. GitHub'a yükle
- github.com → New repository → ad: `faaliyet-raporu` (Private önerilir) → Create
- "uploading an existing file" linkine tıkla → bu klasördeki TÜM dosyaları
  sürükle-bırak (public ve api klasörleriyle birlikte) → Commit

### 2. Vercel'e bağla
- vercel.com → Add New → Project → `faaliyet-raporu` repo'sunu Import et
- Framework Preset: **Other** (otomatik algılar) → Deploy'a BASMADAN önce 3. adım:

### 3. API anahtarını ekle
- Aynı ekranda **Environment Variables** bölümüne:
  - Name: `ANTHROPIC_API_KEY`
  - Value: console.anthropic.com'dan aldığın anahtar (TeklifVerisi'ndekiyle aynı olabilir)
- Sonra **Deploy**

### 4. Kullan
- Çıkan adres (örn. `faaliyet-raporu.vercel.app`) → bookmark'la
- Her çeyrek: Excel'e rakamları gir → sitede "Excel'den Yükle" → AI onayı →
  ✨ işaretli metinleri kontrol et → "Word İndir"

## Maliyet notu
Abonelik YOK. Vercel hobby planı ücretsiz. AI çağrıları kendi Anthropic
anahtarınla kullandıkça öde — bir çeyreklik rapor ~1-2 TL mertebesinde.

## Sorun giderme
- "ANTHROPIC_API_KEY tanımlı değil" → Vercel → Settings → Environment
  Variables → anahtarı ekle → Deployments → Redeploy
- AI yanıt vermiyor → console.anthropic.com'da anahtarın aktif ve bakiyeli olduğunu kontrol et
