
// import { InjectionToken } from '@angular/core';

// export const LocalStorage = new InjectionToken('localStorage');

class LocalStorage{

    public getItem(key:string):string{
        let value='';
        if(typeof window !== 'undefined')
            value = localStorage.getItem(key); 
        else
            value = this.getSampleData(key);                
        return value;
    }

    public setItem(key:string , value :string):void{
        if(typeof window !== 'undefined')
            localStorage.setItem(key,value);
    }
    public removeItem(key:string):void{
        if(typeof window !== 'undefined')
            localStorage.removeItem(key);
    }



    private getSampleData(key){
        let value;
        switch(key){
            case 'device_id':
                    value="SSR";
                    break;
            case 'lat':
                    value="24.830587148908";
                    break;        
            case 'lng':
                    value="46.628746750311";
                    break;        
            case 'selectedMarket':
                    value='{"id":1,"name_ar":"هايبر ماركت","name_en":"Hyper Market","updated_at":"2018-06-21 16:04:40","created_at":"2017-04-18 08:53:02","color":"#f56d13","market_options_images":["https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/cash.png","https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/empty.png","https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/services/pointSale.png"],"market_icon":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-icons/main/1.png","market_image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/markets/market-images/1.jpg","code":"hyper_1","active":1,"priority":1,"delivery_fees":"0","start_at":null,"end_at":null,"minimum_order_price":"40","delivery_time":3,"dark_color":"#e25f07","name":"Hyper Market","is_hyper":1,"delivery_description":"Next delivery at Wednesday 2 pm - 4 pm","last_order":null,"express_delivery":0,"express":{"id":1,"base_fee":15,"percentage_fee":5,"base_time":50,"additional_time_for_product":1,"created_at":"2017-05-18 04:56:23","updated_at":"2017-05-18 04:56:23","active":1,"times":[]},"vat_rate":5}';
                    break;        
            case 'color':
                    value="#f56d13";
                    break;        
            case 'market':
                    value="1";
                    break;  
            case 'address':
                    value = '{"id":247843,"deviceId":"Linuxx86_64-1528815844256-1043383","longitude":"46.628746750311","latitude":"24.830587148908","name":"yasmine","description":null,"created_at":"2018-06-12 18:05:27","updated_at":"2018-06-12 18:05:27","district":"Yasmin","city":"Riyadh"}';
                    break;              
            case 'cart':
                    value='[null,{"totalPrice":106,"map":[[2995,{"count":2,"product":{"id":2995,"box_id":null,"category_id":238,"sub_category_id":257,"filter_ar":"","filter_en":"","price":"50.00","size":"300","description_ar":"","description_en":"","created_at":"2017-04-13 20:45:07","updated_at":"2018-06-14 00:00:06","active":1,"minimarket":0,"offer":0,"nos":0,"image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-2995/small.JPG","extension":"JPG","offer_price":0,"offer_expiration_date":"2018-06-13","box":0,"item_id":0,"product_filter_id":154,"is_available":0,"user_can_collect":null,"percentage_increase":"15.00","percentage_decrease":"40.00","offer_start_date":"2018-06-13","sorting":90,"minimarket_price":"38","vatable":1,"panda_sku":"153095","mini_market_offer":0,"mini_market_offer_start_date":null,"mini_market_offer_expiration_date":null,"image_en":null,"extension_en":null,"increasing_category_id":2,"deleted_at":null,"market_type_id":1,"deactivation_reason":"","created_by":null,"updated_by":20,"promoted":0,"share_link":"https://md4fz.app.goo.gl/9EMTCY1PaBkzWeMG2","main_mini_market_id":null,"name":"حلوى مغطاة ببندق هش وشوكولاتة على الحليب مع حشوة ناعمة وحبة بندق كاملة - فيريرو 300 جرام","description":null,"brand":{"id":746,"name_ar":"فيريرو","name_en":"Ferrero","image":"","created_at":"2017-04-12 14:27:25","updated_at":"2017-04-12 14:27:25"},"images":{"original":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-2995/original.JPG","large":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-2995/large.JPG","small":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-2995/small.JPG","mini":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-2995/mini.JPG"},"favourite":0,"pivot":{"hyper_market_id":28,"product_id":2995,"price":"43.5","availability":0,"max_quantity":null,"deactivated_at":null}}}],[6938,{"count":3,"product":{"id":6938,"box_id":null,"category_id":1019,"sub_category_id":87,"filter_ar":"","filter_en":"","price":"2.00","size":"40","description_ar":"","description_en":"","created_at":"2017-08-22 12:57:20","updated_at":"2018-06-10 15:05:38","active":1,"minimarket":0,"offer":0,"nos":0,"image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-6938/small.jpg","extension":"jpg","offer_price":0,"offer_expiration_date":null,"box":0,"item_id":0,"product_filter_id":143,"is_available":0,"user_can_collect":null,"percentage_increase":"0.00","percentage_decrease":"0.00","offer_start_date":null,"sorting":500,"minimarket_price":"","vatable":1,"panda_sku":"100130645","mini_market_offer":0,"mini_market_offer_start_date":null,"mini_market_offer_expiration_date":null,"image_en":null,"extension_en":null,"increasing_category_id":9,"deleted_at":null,"market_type_id":1,"deactivation_reason":"","created_by":null,"updated_by":40,"promoted":1,"share_link":"https://md4fz.app.goo.gl/NsRPSsetj8afh8Rv1","main_mini_market_id":null,"name":"مقرمشات - القرفة و العسل - صن بايتس 40 جم","description":null,"brand":{"id":1025,"name_ar":"صن بايتس","name_en":"Sunbites","image":"","created_at":"2017-04-12 15:34:59","updated_at":"2017-04-12 15:34:59"},"images":{"original":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-6938/original.jpg","large":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-6938/large.jpg","small":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-6938/small.jpg","mini":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-6938/mini.jpg"},"favourite":0,"pivot":{"hyper_market_id":28,"product_id":6938,"price":"1.95","availability":0,"max_quantity":null,"deactivated_at":null}}}]]},null,{"totalPrice":17,"map":[[15247,{"count":1,"product":{"id":15247,"box_id":null,"category_id":1010,"sub_category_id":49,"filter_ar":null,"filter_en":null,"price":"10.50","size":"120","description_ar":null,"description_en":null,"created_at":"2018-05-07 15:23:24","updated_at":"2018-05-21 15:00:50","active":1,"minimarket":0,"offer":0,"nos":0,"image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15247/small.JPG","extension":"JPG","offer_price":0,"offer_expiration_date":null,"box":0,"item_id":0,"product_filter_id":0,"is_available":1,"user_can_collect":null,"percentage_increase":"0.00","percentage_decrease":"0.00","offer_start_date":null,"sorting":0,"minimarket_price":"10.5","vatable":1,"panda_sku":"24718","mini_market_offer":0,"mini_market_offer_start_date":null,"mini_market_offer_expiration_date":null,"image_en":null,"extension_en":null,"increasing_category_id":12,"deleted_at":null,"market_type_id":3,"deactivation_reason":null,"created_by":20,"updated_by":29,"promoted":0,"share_link":"https://md4fz.app.goo.gl/a8m78p5zdCbQ7ul83","main_mini_market_id":null,"name":"Toothpaste - Red Hot - Closeup 120 ml","description":null,"images":{"original":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15247/original.JPG","large":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15247/large.JPG","small":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15247/small.JPG","mini":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15247/mini.JPG"},"favourite":0}}],[15249,{"count":1,"product":{"id":15249,"box_id":null,"category_id":1010,"sub_category_id":49,"filter_ar":null,"filter_en":null,"price":"6.50","size":"50","description_ar":null,"description_en":null,"created_at":"2018-05-07 15:34:31","updated_at":"2018-05-21 15:00:30","active":1,"minimarket":0,"offer":0,"nos":0,"image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15249/small.JPG","extension":"JPG","offer_price":0,"offer_expiration_date":null,"box":0,"item_id":0,"product_filter_id":0,"is_available":1,"user_can_collect":null,"percentage_increase":"0.00","percentage_decrease":"0.00","offer_start_date":null,"sorting":0,"minimarket_price":"6.3","vatable":1,"panda_sku":"24731","mini_market_offer":0,"mini_market_offer_start_date":null,"mini_market_offer_expiration_date":null,"image_en":null,"extension_en":null,"increasing_category_id":12,"deleted_at":null,"market_type_id":3,"deactivation_reason":null,"created_by":20,"updated_by":29,"promoted":0,"share_link":"https://md4fz.app.goo.gl/y9MvE6psGzxzpxeI2","main_mini_market_id":null,"name":"معجون أسنان - أحمر حار - كلوس اب 50 مل","description":null,"images":{"original":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15249/original.JPG","large":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15249/large.JPG","small":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15249/small.JPG","mini":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15249/mini.JPG"},"favourite":0}}]]},null,{"totalPrice":16,"map":[[15463,{"count":1,"product":{"id":15463,"box_id":null,"category_id":1023,"sub_category_id":null,"filter_ar":"","filter_en":"","price":"16.00","size":" 40×330","description_ar":"","description_en":"","created_at":"2018-05-09 14:12:30","updated_at":"2018-05-20 17:32:40","active":1,"minimarket":0,"offer":0,"nos":0,"image":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15463/small.jpg","extension":"jpg","offer_price":0,"offer_expiration_date":null,"box":0,"item_id":0,"product_filter_id":null,"is_available":1,"user_can_collect":null,"percentage_increase":"0.00","percentage_decrease":"0.00","offer_start_date":null,"sorting":0,"minimarket_price":"16","vatable":1,"panda_sku":"22","mini_market_offer":0,"mini_market_offer_start_date":null,"mini_market_offer_expiration_date":null,"image_en":null,"extension_en":null,"increasing_category_id":7,"deleted_at":null,"market_type_id":5,"deactivation_reason":"","created_by":29,"updated_by":29,"promoted":0,"share_link":"https://md4fz.app.goo.gl/0rTpYnGvM3RufM7Q2","main_mini_market_id":null,"name":"Bottled Drinking Water - Tania  40×330 ml","description":null,"images":{"original":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15463/original.jpg","large":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15463/large.jpg","small":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15463/small.jpg","mini":"https://s3.us-east-2.amazonaws.com/zadfresh-images/uploads/ZAD-PRO-15463/mini.jpg"},"favourite":0}}]]}]';
                    break;        
            default:
                    value="";        
        }
        return value;

    }

}

 export const LocalStorageObject = new LocalStorage();
