# الدليل الشامل لرفع مشروع Smart Retina (End-to-End Deployment Guide)

هذا الدليل هو المرجع النهائي والشامل لرفع مشروع **Smart Retina** بالكامل على الإنترنت. يغطي هذا الدليل إعداد بيئة التطوير، قاعدة البيانات، خدمات التخزين، الباك إند (بما فيه نموذج الذكاء الاصطناعي PyTorch)، والواجهة الأمامية (Next.js).

---

## المكونات التي سيتم رفعها مجاناً:
1. **قاعدة البيانات:** Aiven Cloud (MySQL)
2. **تخزين صور الشبكية:** Cloudinary
3. **الباك إند ومحرك الذكاء الاصطناعي:** Render.com أو Railway
4. **الواجهة الأمامية:** Vercel

---

## المرحلة الأولى: تجهيز الخدمات السحابية (Database & Storage)

### 1. إعداد التخزين السحابي (Cloudinary)
بما أن السيرفرات المجانية تقوم بمسح الملفات المرفوعة يومياً، سنستخدم Cloudinary لتخزين صور الفحوصات الطبية بشكل دائم.
1. قم بإنشاء حساب في [Cloudinary](https://cloudinary.com/).
2. من لوحة التحكم (Dashboard)، اذهب إلى **Programmable Media**.
3. انسخ الثلاثة مفاتيح الأساسية الخاصة بك واحتفظ بها:
   - `Cloud Name`
   - `API Key`
   - `API Secret`

### 2. إعداد قاعدة البيانات السحابية (Aiven MySQL)
لتعمل الواجهة مع الباك إند بشكل حي، يجب أن تكون قاعدة البيانات متاحة على الإنترنت للجميع.
1. قم بإنشاء حساب على [Aiven.io](https://aiven.io/mysql) واختر خدمة **MySQL** بالخطة المجانية (Free Plan).
2. انتظر بضع دقائق حتى يبدأ السيرفر بالعمل وتتحول حالته إلى Running.
3. من لوحة التحكم الخاصة بقاعدة البيانات (Overview)، قم بنسخ **Connection Parameters**:
   - `Host`
   - `Port`
   - `User`
   - `Password`
   - `Database Name` (غالباً تكون `defaultdb`)

### 3. بناء جداول قاعدة البيانات السحابية (مهم جداً)
قبل رفع الباك إند، يجب إنشاء الجداول داخل قاعدة البيانات السحابية الموجودة في Aiven.
1. افتح مشروع **الباك إند** على جهازك.
2. افتح ملف `.env` وقم بتغيير بيانات الاتصال لتشير إلى قاعدة **Aiven** بدلاً من `localhost`.
3. افتح الـ Terminal (متأكداً من تفعيل البيئة الوهمية Python) واكتب أمر التحديث الخاص بـ Alembic لإنشاء الجداول على الإنترنت:
   ```bash
   alembic upgrade head
   ```
*(بهذا تكون قاعدة البيانات السحابية جاهزة وبها جداول المستخدمين والفحوصات).*

---

## المرحلة الثانية: إعداد ورفع الباك إند (FastAPI + AI Model)

### 1. تجهيز الكود للرفع (Git & Github)
1. في مشروع **Smart Retina Backend**، افتح ملف `main.py` وتأكد من تجهيز إعدادات الـ CORS لتستقبل متغير الـ `FRONTEND_URLS` للسماح لـ Vercel لاحقاً بالوصول للبيانات:
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=os.getenv("FRONTEND_URLS", "http://localhost:3000").split(","),
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```
2. تأكد من وجود ملف `requirements.txt` في المسار الرئيسي، وهو يحتوي على كل المكتبات ومنها (`fastapi, uvicorn, torch, torchvision, cloudinary, pymysql...`).
3. **نقطة خطيرة (نموذج الذكاء الاصطناعي):**
   تأكد من أن ملف أوزان النموذج (مثلاً بداخل مجلد `checkpoints/*.pth`) لا يتجاوز حجمه 100 ميجابايت إذا كنت سترفعه بشكل عادي على GitHub. (إذا كان يتجاوز هذا الحجم، يجب استخدام أداة Git LFS).
4. قم برفع مستودع الباك إند بالكامل كـ Public او Private Repo على GitHub.

### 2. الرفع على منصة Render
1. ادخل إلى [Render.com](https://render.com/) وسجل بحساب GitHub.
2. اضغط على **New** ثم من القائمة اختر **Web Service**.
3. قم بتوصيل الـ Repo الخاص بالباك إند.
4. **الإعدادات الأساسية للـ Web Service:**
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000` *(هذا الأمر ضروري لكي يعمل السيرفر)*
5. **متغيرات البيئة (Environment Variables):**
   في صفحة الإعدادات، انزل لتبويب Environment وأضف المتغيرات الآتية كما أخذتها من خدماتها:
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `SECRET_KEY` (مفتاح سري عشوائي للتوثيق JWT)
   - `ALGORITHM` (غالباً `HS256`)
   - `FRONTEND_URLS` (سنعود لاحقاً لتعبئته، ضعه الآن `*` مؤقتاً)
6. اضغط **Create Web Service**. سيستغرق تثبيت المكاتب (خاصة PyTorch) حوالي 5-10 دقائق.
7. عند نجاح الرفع، قم بنسخ رابط السيرفر (مثال `https://smart-retina-api.onrender.com`).

---

## المرحلة الثالثة: إعداد ورفع الواجهة الأمامية (Next.js)

### 1. تجهيز الكود
الواجهة الأمامية بحاجة لمعرفة رابط اتصال الباك إند الجديد.
1. في كود مشروع **Smart Retina Frontend**، تأكد أن جميع استدعاءات الـ API (بواسطة `axios` أو غيره) لا تستخدم `localhost:8000` مباشرة، بل تستخدم المتغير البيئي:
   ```typescript
   // مثال للطريقة الصحيحة
   const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
   const response = await axios.get(`${apiURL}/api/users/me`);
   ```
2. ملاحظة حول صور Next.js: إذا كنت تعرض صور الشبكية باستخدام مُكون `<Image>` الخاص بـ Next.js، يجب أن تأذن لـ Cloudinary في ملف `next.config.mjs` (أو .ts):
   ```javascript
   const nextConfig = {
     images: {
       domains: ['res.cloudinary.com'],
     },
   };
   export default nextConfig;
   ```
3. ارفع كود الواجهة بالكامل إلى مستودع جديد على GitHub.

### 2. الرفع على Vercel
1. ادخل إلى منصة [Vercel](https://vercel.com/) وقم بتسجيل الدخول بـ GitHub.
2. اضغط على **Add New Project** وحدد مستودع الواجهة الأمامية.
3. قبل الضغط على Deploy، افتح قسم **Environment Variables** وأضف:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://smart-retina-api.onrender.com` (الرابط الذي نسخته من Render في المرحلة السابقة، **بدون شرطة / في النهاية**).
4. اضغط **Deploy**.
5. سيتم تجهيز المشروع وإنشاء رابط حصري لواجهة المشروع من Vercel (مثال: `https://smart-retina.vercel.app`). انسخ هذا الرابط.

---

## المرحلة الرابعة: ربط المنظومة النهائية (التوصيل المغلق)

لتأمين السيرفر من أي هجمات ولتفعيل الـ CORS بشكل صحيح:
1. عد للوحة تحكم الباك إند في منصة **Render**.
2. من تبويب **Environment**، قم بتعديل المتغير `FRONTEND_URLS`.
3. احذف النجمة `*` وضع مقامه رابط Vercel الفعلي الخاص بك مع حذف الشرطة الأخيرة إن وجدت:
   - Value: `https://smart-retina.vercel.app`
4. قد تتطلب المنصة إعادة تشغيل للسيرفر، أو ستقوم بذلك تلقائيًا.

---

## 🎉 مبروك! الاختبار النهائي والتأكيد

1. افتح رابط تطبيقك المرفوع على Vercel.
2. حاول التسجيل كمستخدم جديد أو دكتور. (إذا تم التسجيل بنجاح، فقاعدة بيانات **Aiven** تعمل ممتاز).
3. قم بتسجيل الدخول لضمان سلامة التوثيق (JWT Check).
4. اذهب للصفحة الخاصة بتحليل الصور، ارفع صرة شبكية واضغط تحليل.
   - إذا تم الرفع بدون أخطاء، فهذا يعني أن **Cloudinary** يعمل بنجاح.
   - إذا ظهرت لك النتيجة (مثل Normal أو Diabetic Retinopathy)، فهذا يعني أن سيرفر الباك إند ونموذج **PyTorch (AI)** قاما بتحليل الصورة وهما متصلان بنجاح تام!

> **نصائح إضافية:** راقب صندوق الأوامر (Logs) في Render أو Vercel في حال واجهت الشاشة البيضاء أو أخطاء السيرفر (500 Internal Server error) لمعرفة ما إذا كانت المشكلة في اتصال قاعدة البيانات أو في ملفات النموذج.
