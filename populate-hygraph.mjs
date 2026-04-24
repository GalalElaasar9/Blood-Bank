import { GraphQLClient, gql } from "graphql-request";

const HYGRAPH_API = "https://api-eu-west-2.hygraph.com/v2/cmnht9h9r00j308w8mon0qg8p/master";
const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NzU3ODM0MDAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21uaHQ5aDlyMDBqMzA4dzhtb24wcWc4cC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiZTExMTE4YmUtOGIzZi00NjBhLWIyNGQtMjVlZWQ1Njc5YzdjIiwianRpIjoiY21uczdsNHZsMDdxMDA3bWk2ODhiNGhjeCJ9.buEoVZMbjKeDJZvGOdurFTo4y7Dz_n7bEtbnKVF307NgpoFIMIBZci7cAcrShtDG_C18bbYsBL7-UfGN14glcK6yey_NA7UZUn-5puYwwvyO5iHWoVFG1aNJZGexh_2DqhqaU3z2aBxxmCoqE5D5jAxdP-IdDR0G8SK5vFy0SGsV6wyWVNFuDe1ERYhvK4eI0i7vDP8WoNbB35Cd94fcY_lk-AO1eyDq7FICUWWs8TtiwEfJMeC3Ep2tCun9J6wXbTefcmJU2KpReGhzJHi8kBQhnn9YUEZgdDrejLcDsIpFs1qEKPvmSzTpwyNowZgDkyxswROgh3M93gNZmTjfESkTPphSDGEw_htrm7FdkCBNkkSkSwibNJ-8z9lr1fPy9n-eIMTmnYC9f2xXkueDgPENPaCKsGefjF5P3ZIaBtGziVR-U26pXkF1QbdpGeVPQ7I6H_xbS-IezPxIYcUBSiFE64Ys-dCIgPD2c1DMm9cJgF9TeXqC8747fGEkGSCe-gi-TOn7-K-bHke3Rze0BPvIGAAqKWear07_j2u4r5ZJJ1MDre2loXePtf4wwE2ZxEjfwzj3_PUAX4fotPKzK-ljPfrAO7J4VnlBnx7Wz4ePjMmlGsp1kuH2WzF6bkK9n3Ikpbplz-TF4mly3MIUcwwrNPi06j79LwvmqPIWfvg";

const client = new GraphQLClient(HYGRAPH_API, { headers: { Authorization: `Bearer ${TOKEN}` } });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const uid = () => Math.random().toString(36).slice(2, 8);

async function retryRequest(query, vars, retries = 4) {
  for (let i = 0; i < retries; i++) {
    try {
      return await client.request(query, vars);
    } catch (err) {
      if (err.response?.status === 429 && i < retries - 1) {
        const wait = 5000 * (i + 1);
        console.log(`    ⏳ Rate limited, waiting ${wait / 1000}s...`);
        await sleep(wait);
      } else throw err;
    }
  }
}

const bloodTypes = ["A_Positive","A_Negative","B_Positive","B_Negative","AB_Positive","AB_Negative","O_Positive","O_Negative"];

// ============ أسماء مستشفيات مصرية حقيقية (100 مستشفى) ============
const hospitals = [
  // القاهرة
  { name: "مستشفى قصر العيني", city: "cairo", address: "شارع قصر العيني، القاهرة" },
  { name: "مستشفى دار الفؤاد", city: "cairo", address: "السادس من أكتوبر، القاهرة" },
  { name: "مستشفى السلام الدولي", city: "cairo", address: "كورنيش النيل، المعادي، القاهرة" },
  { name: "مستشفى عين شمس التخصصي", city: "cairo", address: "شارع رمسيس، العباسية، القاهرة" },
  { name: "مستشفى الدمرداش", city: "cairo", address: "شارع رمسيس، العباسية، القاهرة" },
  { name: "المركز الطبي العالمي", city: "cairo", address: "شارع الثورة، مصر الجديدة، القاهرة" },
  { name: "مستشفى الجلاء العسكري", city: "cairo", address: "شارع الجلاء، وسط البلد، القاهرة" },
  { name: "مستشفى 57357 لأورام الأطفال", city: "cairo", address: "شارع المنيل، القاهرة" },
  { name: "مستشفى المعادي العسكري", city: "cairo", address: "كورنيش النيل، المعادي، القاهرة" },
  { name: "مستشفى الشيخ زايد التخصصي", city: "cairo", address: "مدينة الشيخ زايد، القاهرة" },
  { name: "مستشفى الصفا", city: "cairo", address: "مدينة نصر، القاهرة" },
  { name: "مستشفى النيل بدراوي", city: "cairo", address: "كورنيش النيل، شبرا، القاهرة" },
  { name: "مستشفى كليوباترا", city: "cairo", address: "شارع كليوباترا، مصر الجديدة، القاهرة" },
  { name: "مستشفى القاهرة التخصصي", city: "cairo", address: "مدينة نصر، القاهرة" },
  { name: "مستشفى المقطم للقوات المسلحة", city: "cairo", address: "المقطم، القاهرة" },

  // الجيزة
  { name: "مستشفى الهرم التخصصي", city: "giza", address: "شارع الهرم، الجيزة" },
  { name: "مستشفى أم المصريين", city: "giza", address: "شارع الملك فيصل، الجيزة" },
  { name: "مستشفى الجيزة العام الجديد", city: "giza", address: "شارع الجامعة، الجيزة" },
  { name: "مستشفى فيصل التخصصي", city: "giza", address: "شارع فيصل، الجيزة" },
  { name: "مستشفى 6 أكتوبر الجامعي", city: "giza", address: "مدينة 6 أكتوبر، الجيزة" },

  // الإسكندرية
  { name: "مستشفى الإسكندرية الجامعي الرئيسي", city: "alexandria", address: "شارع الحرية، الأزاريطة، الإسكندرية" },
  { name: "مستشفى المواساة الجامعي", city: "alexandria", address: "شارع أحمد شوقي، الإسكندرية" },
  { name: "مستشفى الشاطبي الجامعي للأطفال", city: "alexandria", address: "الشاطبي، الإسكندرية" },
  { name: "مستشفى الأنفوشي العام", city: "alexandria", address: "الأنفوشي، الإسكندرية" },
  { name: "مستشفى سموحة الجامعي", city: "alexandria", address: "سموحة، الإسكندرية" },

  // الشرقية
  { name: "مستشفى الزقازيق الجامعي", city: "sharqia", address: "الزقازيق، الشرقية" },
  { name: "مستشفى الأحرار التعليمي", city: "sharqia", address: "الزقازيق، الشرقية" },
  { name: "مستشفى العاشر من رمضان العام", city: "sharqia", address: "العاشر من رمضان، الشرقية" },
  { name: "مستشفى بلبيس المركزي", city: "sharqia", address: "بلبيس، الشرقية" },

  // الدقهلية
  { name: "مستشفى المنصورة الجامعي", city: "dakahlia", address: "شارع الجمهورية، المنصورة، الدقهلية" },
  { name: "مركز أورام المنصورة الجامعي", city: "dakahlia", address: "المنصورة، الدقهلية" },
  { name: "مستشفى المنصورة الدولي", city: "dakahlia", address: "المنصورة، الدقهلية" },
  { name: "مستشفى دكرنس العام", city: "dakahlia", address: "دكرنس، الدقهلية" },

  // الغربية
  { name: "مستشفى طنطا الجامعي", city: "gharbia", address: "شارع الجلاء، طنطا، الغربية" },
  { name: "المستشفى المنشاوي العام", city: "gharbia", address: "طنطا، الغربية" },
  { name: "مستشفى المحلة العام", city: "gharbia", address: "المحلة الكبرى، الغربية" },

  // المنوفية
  { name: "مستشفى المنوفية الجامعي", city: "monufia", address: "شبين الكوم، المنوفية" },
  { name: "مستشفى شبين الكوم التعليمي", city: "monufia", address: "شبين الكوم، المنوفية" },
  { name: "مستشفى السادات المركزي", city: "monufia", address: "مدينة السادات، المنوفية" },

  // القليوبية
  { name: "مستشفى بنها الجامعي", city: "qalyubia", address: "بنها، القليوبية" },
  { name: "مستشفى القناطر الخيرية العام", city: "qalyubia", address: "القناطر الخيرية، القليوبية" },
  { name: "مستشفى شبرا الخيمة العام", city: "qalyubia", address: "شبرا الخيمة، القليوبية" },

  // البحيرة
  { name: "مستشفى دمنهور التعليمي", city: "beheira", address: "دمنهور، البحيرة" },
  { name: "مستشفى رشيد المركزي", city: "beheira", address: "رشيد، البحيرة" },
  { name: "مستشفى كفر الدوار العام", city: "beheira", address: "كفر الدوار، البحيرة" },

  // الفيوم
  { name: "مستشفى الفيوم الجامعي", city: "fayoum", address: "مدينة الفيوم، الفيوم" },
  { name: "مستشفى الفيوم العام الجديد", city: "fayoum", address: "مدينة الفيوم، الفيوم" },

  // بني سويف
  { name: "مستشفى بني سويف الجامعي", city: "beni_suef", address: "بني سويف" },
  { name: "مستشفى بني سويف العام", city: "beni_suef", address: "بني سويف" },

  // المنيا
  { name: "مستشفى المنيا الجامعي", city: "minya", address: "المنيا" },
  { name: "مستشفى ملوي العام", city: "minya", address: "ملوي، المنيا" },
  { name: "مستشفى المنيا العسكري", city: "minya", address: "المنيا" },

  // أسيوط
  { name: "مستشفى أسيوط الجامعي", city: "assiut", address: "أسيوط" },
  { name: "مستشفى الإيمان العام بأسيوط", city: "assiut", address: "أسيوط" },
  { name: "مستشفى أسيوط التخصصي للأطفال", city: "assiut", address: "أسيوط" },

  // سوهاج
  { name: "مستشفى سوهاج الجامعي", city: "sohag", address: "سوهاج" },
  { name: "مستشفى سوهاج العام الجديد", city: "sohag", address: "سوهاج" },

  // قنا
  { name: "مستشفى قنا الجامعي", city: "qena", address: "قنا" },
  { name: "مستشفى قنا العام", city: "qena", address: "قنا" },

  // الأقصر
  { name: "مستشفى الأقصر الدولي", city: "luxor", address: "مدينة الأقصر" },
  { name: "مستشفى الأقصر العام", city: "luxor", address: "مدينة الأقصر" },
  { name: "مستشفى الكرنك الدولي", city: "luxor", address: "الأقصر" },

  // أسوان
  { name: "مستشفى أسوان الجامعي", city: "aswan", address: "أسوان" },
  { name: "مستشفى أسوان التخصصي للقلب", city: "aswan", address: "أسوان" },
  { name: "مستشفى أسوان العام", city: "aswan", address: "أسوان" },

  // بورسعيد
  { name: "مستشفى بورسعيد العام", city: "port_said", address: "بورسعيد" },
  { name: "مستشفى النصر التخصصي ببورسعيد", city: "port_said", address: "بورسعيد" },
  { name: "مستشفى بورفؤاد العام", city: "port_said", address: "بورفؤاد، بورسعيد" },

  // الإسماعيلية
  { name: "مستشفى الإسماعيلية العام", city: "ismailia", address: "الإسماعيلية" },
  { name: "مستشفى قناة السويس الجامعي", city: "ismailia", address: "الإسماعيلية" },
  { name: "مستشفى الإسماعيلية العسكري", city: "ismailia", address: "الإسماعيلية" },

  // السويس
  { name: "مستشفى السويس العام", city: "suez", address: "السويس" },
  { name: "مستشفى السويس التخصصي", city: "suez", address: "السويس" },

  // دمياط
  { name: "مستشفى دمياط العام الجديد", city: "damietta", address: "دمياط" },
  { name: "مستشفى الأزهر الجامعي بدمياط", city: "damietta", address: "دمياط الجديدة" },
  { name: "مستشفى كفر سعد المركزي", city: "damietta", address: "كفر سعد، دمياط" },

  // كفر الشيخ
  { name: "مستشفى كفر الشيخ العام", city: "kafr_el_sheikh", address: "كفر الشيخ" },
  { name: "مستشفى دسوق العام", city: "kafr_el_sheikh", address: "دسوق، كفر الشيخ" },
  { name: "مستشفى بيلا المركزي", city: "kafr_el_sheikh", address: "بيلا، كفر الشيخ" },

  // شمال سيناء
  { name: "مستشفى العريش العام", city: "north_sinai", address: "العريش، شمال سيناء" },
  { name: "مستشفى بئر العبد المركزي", city: "north_sinai", address: "بئر العبد، شمال سيناء" },

  // جنوب سيناء
  { name: "مستشفى شرم الشيخ الدولي", city: "south_sinai", address: "شرم الشيخ، جنوب سيناء" },
  { name: "مستشفى طور سيناء العام", city: "south_sinai", address: "الطور، جنوب سيناء" },

  // البحر الأحمر
  { name: "مستشفى الغردقة العام", city: "red_sea", address: "الغردقة، البحر الأحمر" },
  { name: "مستشفى سفاجا المركزي", city: "red_sea", address: "سفاجا، البحر الأحمر" },
  { name: "مستشفى القصير المركزي", city: "red_sea", address: "القصير، البحر الأحمر" },

  // الوادي الجديد
  { name: "مستشفى الخارجة العام", city: "new_valley", address: "الخارجة، الوادي الجديد" },
  { name: "مستشفى الداخلة العام", city: "new_valley", address: "موط، الوادي الجديد" },

  // مستشفيات إضافية لإكمال 100
  { name: "مستشفى وادي النيل", city: "cairo", address: "شبرا، القاهرة" },
  { name: "مستشفى مصر الدولي", city: "cairo", address: "التجمع الخامس، القاهرة" },
  { name: "مستشفى الجوهرة", city: "alexandria", address: "ستانلي، الإسكندرية" },
  { name: "مستشفى رأس التين العام", city: "alexandria", address: "رأس التين، الإسكندرية" },
  { name: "مستشفى ابن سينا التخصصي", city: "cairo", address: "مدينة نصر، القاهرة" },
  { name: "مستشفى الحسين الجامعي", city: "cairo", address: "الحسين، القاهرة" },
  { name: "مستشفى الساحل التعليمي", city: "cairo", address: "شبرا، القاهرة" },
  { name: "مستشفى منشية البكري العام", city: "cairo", address: "مصر الجديدة، القاهرة" },
  { name: "مستشفى حلوان العام", city: "cairo", address: "حلوان، القاهرة" },
  { name: "مستشفى الشروق التخصصي", city: "cairo", address: "مدينة الشروق، القاهرة" },
];

const firstNames = ["أحمد","محمد","علي","حسن","يوسف","إبراهيم","عمر","خالد","مصطفى","سارة","فاطمة","مريم","نور","هدى","ليلى","آية","دينا","رنا","هبة","ياسمين","كريم","طارق","سامي","وليد","حسام","رامي","تامر","هاني","عادل","ماجد"];
const lastNames = ["محمد","أحمد","علي","حسن","إبراهيم","عبدالله","السيد","الشريف","المصري","عثمان","سليمان","يوسف","خليل","رمضان","عبدالعزيز","حسين","صالح","جابر","شاهين","منصور"];

const DELAY = 2500;

async function main() {
  console.log(`🏥 Creating ${hospitals.length} hospitals...\n`);
  const hospitalIds = [];
  let skipped = 0;

  for (let i = 0; i < hospitals.length; i++) {
    const h = hospitals[i];
    const phone = `01${rand(0, 2)}${String(rand(10000000, 99999999))}`;
    // إيميل فريد باستخدام random ID
    const email = `${h.city}-${uid()}@bloodbank-eg.com`;

    try {
      const res = await retryRequest(
        gql`mutation CreateHospital($data: HospitalCreateInput!) { createHospital(data: $data) { id } }`,
        { data: { name: h.name, city: h.city, phone, email, whatsapp: phone, address: h.address } }
      );
      await sleep(1200);
      await retryRequest(
        gql`mutation Publish($id: ID!) { publishHospital(where: { id: $id }) { id } }`,
        { id: res.createHospital.id }
      );
      hospitalIds.push(res.createHospital.id);
      console.log(`  ✅ [${i + 1}/${hospitals.length}] ${h.name}`);
    } catch (err) {
      const msg = err.response?.errors?.[0]?.message || err.message;
      if (msg.includes("not unique")) {
        console.log(`  ⏭️  [${i + 1}] ${h.name} — موجود بالفعل، تخطي`);
        skipped++;
      } else {
        console.error(`  ❌ [${i + 1}] ${h.name}: ${msg}`);
      }
    }
    await sleep(DELAY);
  }

  console.log(`\n✅ تم إنشاء ${hospitalIds.length} مستشفى (تخطي ${skipped} موجودين بالفعل)`);

  // ====== Blood Inventory ======
  console.log(`\n🩸 Creating blood inventory for ${hospitalIds.length} hospitals...`);
  let invCount = 0;
  for (let h = 0; h < hospitalIds.length; h++) {
    const hospId = hospitalIds[h];
    const numTypes = rand(6, 8);
    const shuffled = [...bloodTypes].sort(() => Math.random() - 0.5).slice(0, numTypes);

    for (const bt of shuffled) {
      const quantity = Math.random() < 0.25 ? rand(0, 4) : rand(5, 30);
      try {
        const res = await retryRequest(
          gql`mutation CreateBloodInventory($data: BloodInventoryCreateInput!) { createBloodInventory(data: $data) { id } }`,
          { data: { bloodType: bt, quantity, price: rand(100, 500), hospital: { connect: { id: hospId }} } }
        );
        await sleep(800);
        await retryRequest(
          gql`mutation Publish($id: ID!) { publishBloodInventory(where: { id: $id }) { id } }`,
          { id: res.createBloodInventory.id }
        );
        invCount++;
      } catch (err) {
        console.error(`  ❌ Inv: ${err.response?.errors?.[0]?.message || err.message}`);
      }
      await sleep(1500);
    }
    if ((h + 1) % 10 === 0) console.log(`  📦 ${h + 1}/${hospitalIds.length} hospitals done (${invCount} records)`);
  }
  console.log(`  ✅ Total inventory: ${invCount} records\n`);

  // ====== Donors ======
  console.log("👤 Creating 55 donors...");
  let donorCount = 0;
  for (let i = 0; i < 55; i++) {
    const name = `${pick(firstNames)} ${pick(lastNames)}`;
    const year = rand(1970, 2003);
    const month = String(rand(1, 12)).padStart(2, "0");
    const day = String(rand(1, 28)).padStart(2, "0");
    const natId = `${String(year).slice(-2)}${month}${day}${String(rand(1000000, 9999999))}`;

    try {
      const res = await retryRequest(
        gql`mutation CreateDonor($data: DonorCreateInput!) { createDonor(data: $data) { id } }`,
        { data: { name, phone: `01${rand(0, 2)}${String(rand(10000000, 99999999))}`, bloodType: pick(bloodTypes), city: pick(["cairo","giza","alexandria","sharqia","dakahlia","gharbia","monufia","qalyubia","beheira","fayoum","minya","assiut","sohag","qena","luxor","aswan","port_said","ismailia","suez","damietta","kafr_el_sheikh","beni_suef","north_sinai","south_sinai","red_sea","new_valley"]), nationalId: natId, dateOfBirth: `${year}-${month}-${day}` } }
      );
      await sleep(1000);
      await retryRequest(
        gql`mutation Publish($id: ID!) { publishDonor(where: { id: $id }) { id } }`,
        { id: res.createDonor.id }
      );
      donorCount++;
      console.log(`  ✅ [${i + 1}/55] ${name}`);
    } catch (err) {
      console.error(`  ❌ Donor: ${err.response?.errors?.[0]?.message || err.message}`);
    }
    await sleep(DELAY);
  }

  // console.log(`\n🎉 تم بنجاح!`);
  // console.log(`   🏥 مستشفيات: ${hospitalIds.length}`);
  // console.log(`   🩸 سجلات دم: ${invCount}`);
  // console.log(`   👤 متبرعين: ${donorCount}`);
}

main().catch(console.error);
