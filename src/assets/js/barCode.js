$(document).ready(function(){
    $(document).on("click","#saluda",function () {
        var variable = $("#cadena").val();
        JsBarcode("#barcode",variable);
    });
});