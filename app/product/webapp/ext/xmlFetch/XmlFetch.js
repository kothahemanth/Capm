sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "jquery.sap.global"
], function (MessageToast, JSONModel, jQuery) {
    'use strict';

    return {
        fetch : function (oEvent) {
            jQuery.ajax({
                url: "/odata/v4/nnrg/productData", 
                method: "POST",
                contentType: "application/json",
                
                success: function (oData) {
                    console.log("XML DATA : ",oData);
                    
                },
                error: function (oError) {
                    console.error("ERROR!!!!!!!!!!!");
                    
                }
            });
        }
    };
});