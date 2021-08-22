
===+
- 新建一个收藏 (+ New Collection)
- [收藏菜单]新建一个请求 (Add Request)
    Request name[]
    Request description[]
    Select a collection   // 保存在哪个收藏夹

- 新建一个环境 (Add Environment)
    右上角[Manage Environments] > 弹窗[Add] 
    > 
    EnvironmentName[ ] 
    变量VARIABLE[ ]  初始值INITIAL VALUE[ ]  当前值 CURRENT VALUE[ ]
    > [Add] > 

[#]  验证 
    - 登录 
        [FORM_START]
        [LIST|XX项目API集(*login  upload)]
        切换环境：[DROP_DOWN|sever-demo]  要使用的变量：origin

        [DROP_DOWN|POST] [INPUT|{{origin}}/api/login/]  [BTN|Send] [BTN|Save]
        
        [TAB]Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings
        [RADIO]none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL        
        [TABLE]KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        [TABLE_END]

        [BTN>Save] > [BTN>Send] > 得到：e4fc5eb9-316a-48e5-a970-dc116e7ab897
        [FORM_END]
    
    - 需要验证的请求
        [FORM_START]
        [LIST|XX项目API集(login  *upload)]
        切换环境：[DROP_DOWN|sever-demo]  要使用的变量：origin

        [DROP_DOWN|POST] [INPUT|{{origin}}/api/cdn/UploadFile/]  [BTN|Send] [BTN|Save]

        [TAB]Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings             
        [TABLE]KEY        VALUE      DESCRIPTION  
            authenticate  e4fc5eb9-316a-48e5-a970-dc116e7ab897
        [TABLE_END]

        [TAB]Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings
        [RADIO]none  form-data  x-www-form-urlencoded  raw  [binary]  GraphQL 
        [BTN>Select File]

        [BTN>Save] > [BTN>Send] 
        [FORM_END]
===-