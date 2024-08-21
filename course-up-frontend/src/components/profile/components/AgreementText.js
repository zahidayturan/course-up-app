import React from 'react';

const TrainerAgreementText = () => {
    return (
        <div>
            <p style={{fontWeight: "bold", fontSize: 16, marginBottom: 8}}>Eğitmen Olma Sözleşmesi</p>
            <p><span>1. Taraflar:</span> Bu sözleşme, <span>CourseUp</span> ("Platform") ile <span>Eğitmen Adı</span> ("Eğitmen") arasında imzalanmıştır.</p>
            <p><span>2. Sözleşmenin Konusu:</span> Bu sözleşme, Eğitmen'in Platform üzerinden kurslar sunmasına ve içerik üretmesine ilişkin şartları ve koşulları belirler.</p>
            <p><span>3. Eğitmen'in Yükümlülükleri:</span></p>
            <ul>
                <li>Eğitmen, sunduğu tüm içeriklerin orijinal ve yasalara uygun olduğunu beyan eder.</li>
                <li>Eğitmen, kurs içeriklerinin güncel, doğru ve anlaşılır olmasını sağlar.</li>
                <li>Eğitmen, Platform'un belirlediği kalite standartlarına ve teknik gereksinimlere uygun içerikler üretir.</li>
                <li>Eğitmen, öğrencilere zamanında ve etkili bir şekilde destek sağlar ve sorularını yanıtlar.</li>
            </ul>
            <p><span>4. Platform'un Yükümlülükleri:</span></p>
            <ul>
                <li>Platform, Eğitmen'in sunduğu içerikleri yayınlamak ve tanıtmak için gerekli altyapıyı sağlar.</li>
                <li>Platform, Eğitmen'in içeriklerine erişim sağlayacak ve kurs kayıtları ile ilgili gerekli bilgileri paylaşacaktır.</li>
                <li>Eğitmen'e ödenecek komisyon ve/veya ücretler konusunda şeffaf bir sistem oluşturur.</li>
            </ul>
            <p><span>5. Ücretlendirme ve Ödemeler:</span></p>
            <ul>
                <li>Eğitmen, Platform üzerinden satılan her kurs için belirli bir komisyon oranında ödeme alır. Bu oran %1 olarak belirlenmiştir.</li>
                <li>Ödemeler, her ayın ilk günü Eğitmen'in belirttiği banka hesabına yapılacaktır.</li>
                <li>Vergi ve diğer yasal kesintiler Eğitmen'in sorumluluğundadır.</li>
            </ul>
            <p><span>6. Fikri Mülkiyet Hakları:</span></p>
            <ul>
                <li>Eğitmen, sunduğu içeriklerin fikri mülkiyet haklarının kendisine ait olduğunu ve bu hakları ihlal eden hiçbir içeriği paylaşmadığını taahhüt eder.</li>
                <li>Platform, Eğitmen'in içeriklerini tanıtım amaçlı kullanma hakkına sahiptir.</li>
            </ul>
            <p><span>7. Sözleşmenin Süresi ve Feshi:</span></p>
            <ul>
                <li>Bu sözleşme, imza tarihinden itibaren 1 yıl süreyle geçerlidir ve taraflardan biri fesih talebinde bulunmadıkça otomatik olarak yenilenir.</li>
                <li>Taraflardan biri, karşı tarafa yazılı bildirimde bulunarak sözleşmeyi herhangi bir zamanda feshedebilir. Fesih bildirimi, en az 30 gün önceden yapılmalıdır.</li>
            </ul>
            <p><span>8. Gizlilik:</span></p>
            <ul>
                <li>Taraflar, bu sözleşme kapsamında elde edilen tüm bilgileri gizli tutacak ve üçüncü taraflarla paylaşmayacaktır.</li>
                <li>Eğitmen, öğrencilerin kişisel bilgilerini gizli tutmakla yükümlüdür.</li>
            </ul>
            <p><span>9. Uyuşmazlıkların Çözümü:</span></p>
            <ul>
                <li>Bu sözleşmeden doğabilecek tüm uyuşmazlıklar, öncelikle taraflar arasında dostane bir şekilde çözülmeye çalışılacaktır.</li>
                <li>Çözüm sağlanamazsa, uyuşmazlıklar Türkiye mahkemelerinde çözümlenecektir.</li>
            </ul>
            <p><span>10. Diğer Hükümler:</span></p>
            <ul>
                <li>Bu sözleşme, tarafların yazılı onayı olmadan değiştirilemez.</li>
                <li>Bu sözleşme, tarafların tamamını bağlayıcı niteliktedir.</li>
            </ul>
        </div>
    );
};

export default TrainerAgreementText;
