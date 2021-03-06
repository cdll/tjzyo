/**
 * Register controller
 * @return 
 */
module.exports = Controller("User/BaseController", function(){
    // "use strict";
    return {
        indexAction: function(){
            var self= this;
            self.display('');
        },
        registAction: function(){
            var self = this;
            var tel = self.post('cellphone');
            var code = self.post('code');
            var pwd1 = self.post('passwrod');
            //var pwd2 = self.post('password2');
            var api_url= zyoAPI.user_register+ "&cellphone="+ tel+ "&code="+ code+ "&password="+ md5(pwd1);
            request(api_url,function(error,response,body){
                console.log(api_url, JSON.parse(body.trim()));
                var res= JSON.parse(body.trim())
                if(res.code== 0){
                    console.log(res);
                    self.end(res)
                }
                else{
                    self.end(res)
                }
            });
        },
        verifyAction:function(){
            var self = this;
            var tel = self.post('telephone');
            console.log(tel);
            var api_url = zyoAPI.user_code+"&cellphone="+tel+"&type=0";
            request(api_url, function(error, response, body){
                console.log(api_url, JSON.parse(body.trim()));
                if(!error){
                    var res= JSON.parse(body.trim());
                    if(res.code == 0){
                         self.end(JSON.stringify(res.data));
//                         self.end("验证码已发送，请注意查收！");
                    // }else if(data.code == 13){
                    //     self.end("请输入正确的手机号码！");
                    // }else if(data.code == 12){
                    //     self.end("该手机号已注册，无法绑定，请直接登录！");
                    // }else if(data.code == 17){
                    //     self.end("1");
                    // }else{
                    //     self.end("获取验证码失败！");
                    }
                    // console.log("index_code:\n", body);
                }else{
                    self.end("获取验证码失败！");
                }
            });

        }
    };
});