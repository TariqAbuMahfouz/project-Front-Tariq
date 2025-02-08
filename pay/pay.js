document.querySelector(".btn").addEventListener("click", function(event) {
    event.preventDefault(); 


    // إضافة خاصية required للحقول إذا لم تكن موجودة
    const requiredFields = [
        "#fname", "#email", "#adr", "#city", "#state", "#zip", 
        "#cname", "#ccnum", "#expmonth", "#expyear", "#cvv"
    ];
    
    requiredFields.forEach(function(selector) {
        let field = document.querySelector(selector);
        if (field && !field.hasAttribute('required')) {
            field.setAttribute('required', 'true');
        }
    });

    // التحقق من أن جميع الحقول المطلوبة تم ملؤها
    let isValid = true;
    requiredFields.forEach(function(selector) {
        let field = document.querySelector(selector);
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = 'red'; 
        } else {
            field.style.borderColor = 'green'; 
        }
    });

    if (isValid) {
        alert("تم تأكيد الطلب! سيتم معالجة الدفع والشحن قريبًا.");
        document.querySelector("form").submit(); 
    } else {
        alert("يرجى تعبئة جميع الحقول المطلوبة.");
    }
});
