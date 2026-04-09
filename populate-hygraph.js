const { GraphQLClient, gql } = require("graphql-request");

const HYGRAPH_API = "https://api-eu-west-2.hygraph.com/v2/cmnht9h9r00j308w8mon0qg8p/master";
const TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NzU2MTA3ODIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21uaHQ5aDlyMDBqMzA4dzhtb24wcWc4cC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiNjk2OTU4ZmUtNDFkOC00ZjcxLWIwNGYtNWYxNDUyMjk4ZjQ0IiwianRpIjoiY21ucGN0YzFsMGJjdzA3bDNieGpzMG04ZyJ9.4xwP2V3hjjuam4vJvxVa3UiQL9QOYo5akfWWf-oDOMIUK_QV5X6YBiJz-7qMmc5KXVaFrbJ0sL3gGvXJKOpgjIPyOgMykvI2zzoL-Eh2J5WywYa6EZWRmcKesvxwNyYsEU3BA9lTxNfcAwe3l6Xk77SmO-B6V0sgxYxC7pzHV8mBSCRvN2rEK3TqyHlZDc28ZxzDekiZ3AKR7eI8MIjV_I7b6MLJX7q1bHGRB_FO4pnhcPnvnJFSBqKQxpD2fLtlBPPU_Wxht-YdIWb_rYS-98lUsvEF-tCJ4hJU0gHOPmBCCcoH5HAps1sG9wcjUHEVgcF-CW_dHUmaJjcdHXsoG6xHEhPzieWDhnfYbfZtxTpzM7fdOAn4wOAUQ-1rqVWbrqBBc0E2Ncz__5aBVd7Hl5CoF8N_IWu-hzcfE0xkACYGMcIUImrdhcEi4zo_YtzL7_jAQ1f4iZbgPwb9bmEeUZWe4YsB_8LzlK4hX6rE4HuaaodskbQsdnDzsZmhggXzvzPR8r8pgBmwa68IrA_35tUwIEjXiCpvQoetLUhjkem5CVvGq2z0Xoregx6HPSviZVYHP5vtC-q7yl52AjQXP5XD_PkeffSEON2S5JnA_TkDd1XizWtY4RImb32qlcOncx9yf7hQsDEdSlq_hU6NOmzzvUM-5TIRLp4k9gNc20s";

const client = new GraphQLClient(HYGRAPH_API, {
  headers: { Authorization: `Bearer ${TOKEN}` },
});

const CREATE_HOSPITAL = gql`
  mutation CreateHospital($data: HospitalCreateInput!) {
    createHospital(data: $data) { id }
  }
`;
const PUBLISH_HOSPITAL = gql`
  mutation Publish($id: ID!) {
    publishHospital(where: { id: $id }) { id }
  }
`;
const CREATE_INVENTORY = gql`
  mutation CreateBloodInventory($data: BloodInventoryCreateInput!) {
    createBloodInventory(data: $data) { id }
  }
`;
const PUBLISH_INVENTORY = gql`
  mutation Publish($id: ID!) {
    publishBloodInventory(where: { id: $id }) { id }
  }
`;
const CREATE_DONOR = gql`
  mutation CreateDonor($data: DonorCreateInput!) {
    createDonor(data: $data) { id }
  }
`;
const PUBLISH_DONOR = gql`
  mutation Publish($id: ID!) {
    publishDonor(where: { id: $id }) { id }
  }
`;

const bloodTypes = ["A_Positive","A_Negative","B_Positive","B_Negative","AB_Positive","AB_Negative","O_Positive","O_Negative"];
const cities = ["cairo","giza","alexandria","sharqia","dakahlia","gharbia","monufia","qalyubia","beheira","fayoum","beni_suef","minya","assiut","sohag","qena","luxor","aswan","port_said","ismailia","suez","kafr_el_sheikh","damietta","matrouh","north_sinai","south_sinai","red_sea","new_valley"];

const cityNames = {
  cairo:"القاهرة",giza:"الجيزة",alexandria:"الإسكندرية",sharqia:"الشرقية",dakahlia:"الدقهلية",
  gharbia:"الغربية",monufia:"المنوفية",qalyubia:"القليوبية",beheira:"البحيرة",fayoum:"الفيوم",
  beni_suef:"بني سويف",minya:"المنيا",assiut:"أسيوط",sohag:"سوهاج",qena:"قنا",luxor:"الأقصر",
  aswan:"أسوان",port_said:"بورسعيد",ismailia:"الإسماعيلية",suez:"السويس",
  kafr_el_sheikh:"كفر الشيخ",damietta:"دمياط",matrouh:"مطروح",north_sinai:"شمال سيناء",
  south_sinai:"جنوب سيناء",red_sea:"البحر الأحمر",new_valley:"الوادي الجديد"
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];

const hospitalTemplates = [
  "مستشفى {city} العام", "مستشفى {city} الجامعي", "مستشفى {city} التخصصي",
  "مستشفى {city} المركزي", "مستشفى {city} الدولي", "المركز الطبي ب{city}",
  "مستشفى الشفاء ب{city}", "مستشفى النور ب{city}", "مستشفى السلام ب{city}",
  "مستشفى الحياة ب{city}", "مستشفى الأمل ب{city}", "مستشفى الرحمة ب{city}",
];

const firstNames = ["أحمد","محمد","علي","حسن","يوسف","إبراهيم","عمر","خالد","مصطفى","سارة","فاطمة","مريم","نور","هدى","ليلى","آية","دينا","رنا","هبة","ياسمين","منى","ريم","شيماء","إسلام","كريم","طارق","سامي","وليد","حسام","رامي","تامر","هاني","عادل","ماجد","سعيد","جمال","فهد","زياد","بلال","أنس","عبدالله","عبدالرحمن","ناصر","صلاح","عماد","شريف","أسامة","مروان","باسم","رضا"];
const lastNames = ["محمد","أحمد","علي","حسن","إبراهيم","عبدالله","السيد","الشريف","المصري","عثمان","سليمان","يوسف","خليل","رمضان","عبدالعزيز","الفقي","حسين","مرسي","فوزي","صالح","جابر","نصر","بدوي","شاهين","طه","عيسى","موسى","هلال","سالم","منصور"];

async function main() {
  console.log("🏥 Creating hospitals...");
  const hospitalIds = [];

  for (let i = 0; i < 32; i++) {
    const cityKey = cities[i % cities.length];
    const cityAr = cityNames[cityKey];
    const template = hospitalTemplates[i % hospitalTemplates.length];
    const name = template.replace("{city}", cityAr);
    const phone = `01${rand(0,2)}${String(rand(10000000,99999999))}`;

    try {
      const res = await client.request(CREATE_HOSPITAL, {
        data: {
          name,
          city: cityKey,
          phone,
          email: `hospital${i+1}@bloodbank-eg.com`,
          whatsapp: phone,
          address: `شارع ${rand(1,200)}، ${cityAr}، مصر`,
        }
      });
      const id = res.createHospital.id;
      await client.request(PUBLISH_HOSPITAL, { id });
      hospitalIds.push(id);
      console.log(`  ✅ ${name}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${name}`, err.message);
    }
  }

  console.log(`\n🩸 Creating blood inventory...`);
  for (const hospId of hospitalIds) {
    const typesToUse = bloodTypes.slice(0, rand(6, 8));
    for (const bt of typesToUse) {
      const isLowStock = Math.random() < 0.25;
      const quantity = isLowStock ? rand(0, 4) : rand(5, 30);
      const price = rand(100, 500);
      try {
        const res = await client.request(CREATE_INVENTORY, {
          data: {
            bloodType: bt,
            quantity,
            price,
            hospitals: { connect: [{ id: hospId }] }
          }
        });
        await client.request(PUBLISH_INVENTORY, { id: res.createBloodInventory.id });
      } catch (err) {
        console.error(`  ❌ Inventory error:`, err.message);
      }
    }
    process.stdout.write(".");
  }
  console.log("\n");

  console.log("👤 Creating donors...");
  for (let i = 0; i < 55; i++) {
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const name = `${firstName} ${lastName}`;
    const cityKey = pick(cities);
    const bt = pick(bloodTypes);
    const year = rand(1970, 2003);
    const month = String(rand(1, 12)).padStart(2, "0");
    const day = String(rand(1, 28)).padStart(2, "0");
    const natId = `${String(year).slice(-2)}${month}${day}${String(rand(1000000, 9999999))}`;

    try {
      const res = await client.request(CREATE_DONOR, {
        data: {
          name,
          phone: `01${rand(0,2)}${String(rand(10000000,99999999))}`,
          bloodType: bt,
          city: cityKey,
          nationalId: natId,
          dateOfBirth: `${year}-${month}-${day}`,
        }
      });
      await client.request(PUBLISH_DONOR, { id: res.createDonor.id });
      console.log(`  ✅ ${name}`);
    } catch (err) {
      console.error(`  ❌ Donor error:`, err.message);
    }
  }

  console.log("\n🎉 Done! Created hospitals, inventory, and donors.");
}

main().catch(console.error);
