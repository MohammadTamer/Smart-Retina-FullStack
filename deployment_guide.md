# الدليل الشامل لرفع مشروع Smart Retina (Deployment Guide)

هذا الدليل يضم كافة الخطوات البرمجية خطوة بخطوة والتي يمكنك الرجوع إليها وتنفيذها متى أردت رفع مشروعك على الإنترنت بشكل كامل ليصبح متاحاً للجميع.

---

## 1. التجهيزات الأساسية (تم إنجازها)
قبل البدء في الرفع الفعلي لسيرفرات الموقع، تأكدنا من إعداد الخدمات السحابية التي يعتمد عليها الـ Backend:

### أ. التخزين السحابي للصور (Cloudinary)
بدلاً من حفظ الصور على جهازك مباشرة (والذي سيختفي بعد الرفع)، قمنا بربط الكود بـ Cloudinary عبر المكتبة المخصصة له.
*   **الإجراء:** تم تثبيت مكتبة `cloudinary` في الباك إند، وتم إضافة بيانات الـ API في ملف الـ `.env` الخاص بالباك إند:
```env
CLOUDINARY_CLOUD_NAME=********
CLOUDINARY_API_KEY=********
CLOUDINARY_API_SECRET=********
```
*نتيجة ذلك أن روابط الصور التي تُخزن في قاعدة البيانات أصبحت روابط سحابية آمنة (مثال: `https://res.cloudinary.com/...`).*

---

## 2. تهيئة قاعدة البيانات السحابية (Aiven MySQL)
الباك إند حالياً يتصل بقاعدة بيانات موجودة على `localhost:3306`. لكي يعمل على سيرفر أجنبي، يجب أن يتصل بقاعدة سحابية.

### الخطوة الأولى: إنشاء قاعدة البيانات
1. اذهب إلى [Aiven.io](https://aiven.io/mysql) وقم بتسجيل الدخول وإنشاء خدمة MySQL (خطة مجانية).
2. عند الانتهاء من تجهيزها، انسخ بيانات الاتصال الأساسية: **Host**, **Port**, **User**, **Password**.

### الخطوة الثانية: تعديل كود الباك إند (`database.py`)
السيرفرات السحابية لا تستخدم منفذ 3306 دائماً. يجب تعديل ملف `app/db/database.py`:
```diff
  db_user = os.getenv("DB_USER", "root")
  db_password = os.getenv("DB_PASSWORD", "")
  db_host = os.getenv("DB_HOST", "localhost")
+ db_port = os.getenv("DB_PORT", "3306")
  db_name = os.getenv("DB_NAME", "smart_retina_db")
  
  encoded_password = quote_plus(db_password)
- SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}:3306/{db_name}"
+ SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{db_user}:{encoded_password}@{db_host}:{db_port}/{db_name}"
```

### الخطوة الثالثة: تعديل الـ `.env`
قم بتغيير إعدادات قاعدة البيانات المحلية لتضع بيانات Aiven:
```env
DB_USER=avnadmin
DB_PASSWORD=ضع_هنا_كلمة_مرور_aiven
DB_HOST=mysql-2f93a696-smart-retina-2026.e.aivencloud.com
DB_PORT=24888
DB_NAME=defaultdb
```

---

## 3. تجهيز الـ CORS في الباك إند (Accepting Traffic)
لكي لا يرفض الباك إند طلبات الواجهة الأمامية بعد رفعها، يجب أن نجعله يستقبل متغير بيئة `FRONTEND_URLS`.

### التعديل في `main.py`:
```diff
  app.add_middleware(
      CORSMiddleware,
-     allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"],
+     allow_origins=os.getenv("FRONTEND_URLS", "http://localhost:3000").split(","),
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
```

---

## 4. تجهيز الواجهة الأمامية (Frontend APIs)
الواجهة الأمامية كانت تتواصل مع `http://localhost:8000` بشكل صريح. يجب استبدالها ليتم التحكم بها برمجياً لتجنب المشاكل عند رقع الباك إند.

### الخطوة الأولى: إنشاء `.env.local`
في مجلد الـ `Smart-Retina-frontend`، قم بإنشاء ملف باسم `.env.local` وضع فيه المتغير:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### الخطوة الثانية: استبدال الروابط (Refactoring)
قم بفتح جميع الملفات التي تحتوي على طلبات `axios` أو تتحدث مع السيرفر، واستبدل `http://localhost:8000` لكي يقرأ المتغير.
*الملفات الهامة: (`AuthContext.tsx`, `GoogleLoginButton.tsx`, `login/page.tsx`, `dashboard/page.tsx`, ...)*

**مثال للتعديل بداخل كود الـ TSX:**
```diff
- const res = await axios.get("http://localhost:8000/api/scans/my-scans");
+ const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/scans/my-scans`);
```

---

## 5. مرحلة الرفع النهائية (Hosting)

بمجرد عمل `git push` لكل هذه التعديلات المذكورة في الأعلى، يمكنك بدء الرفع:

### أ. الباك إند (FastAPI) على موقع Render أو Railway:
1. قم بإنشاء "Web Service" واربطها بمستودع الـ GitHub الخاص بالباك إند.
2. سيرى المنصة ملف الـ `requirements.txt` وسيقوم بتثبيت المكاتب.
3. أثناء إعداد الرفع، انسخ كل المتغيرات الموجودة في الـ `.env` وضعها كما هي في إعدادات المنصة (Environment Variables).
4. اضف متغير إضافي للباك إند وهو:
   `FRONTEND_URLS = <رابط موقع الفرونت المرفوع على Vercel>`
5. سيعطيك هذا الموقع رابطاً للباك إند، (مثال: `https://smart-retina.onrender.com`). احتفظ به!

### ب. الواجهة الأمامية (Next.js) على موقع Vercel:
1. افتح Vercel والصق مستودع الـ GitHub الخاص بالواجهة.
2. في إعدادات الـ Environment Variables في Vercel، أضف متغيراً واحداً:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://smart-retina.onrender.com` (الذي حصلت عليه من الباك إند).
3. اضغط Deploy! 

> [!TIP]
> بمجرد انتهاء Vercel، ستمتلك واجهة خرافية متصلة بباك إند حي على الإنترنت يتصل بقاعدة بيانات سحابية تحفظ ملفاتك في سحابة صور! ويمكنك اختبار رفع صورة بنجاح وطلب مراجعتها من أي حاسوب في العالم.
