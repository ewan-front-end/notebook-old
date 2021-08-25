
===+
■⇤{padding-bottom: 10px; background-color:#fcf7ef}
#### 新建一个目录(收藏){color:#e6b362}    
    [FORM_START]
    [BTNbg6 cf|+ New Collection] ➤ ↴background-color:#fff; vertical-align:top; padding:10px↤名称▭{color:#ffaa22}collection-name▭ 说明▭说明文本▭↦ ➤ [BTNbg6 cf|Create]
    [FORM_END]
■

■⇤{border:#60b491 0px solid; padding: 10px 0; background-color:#eff7f4}
#### 新建一个请求{color:#60b491}     
    [FORM_START]
    ▤collection-name{color:#ffaa22}(bd)▤  ➤ ▤Add Request▤ ➤ ↴background-color:#fff; vertical-align:top; padding:10px↤请求名称▭{color:#20b477}(bd)登录▭ 请求说明▭说明文本▭ 选择所属目录:▼collection-name{color:#ffaa22}(bd)▼↦ ➤ [BTNbg6 cf|Save to collection-name]
    [FORM_END]
■

■⇤{border:#b180eb 0px solid; padding: 10px 0; background-color:#f7f2fd}
#### 新建一个环境{color:#b180eb}
    [FORM_START]
    右上角 [BTNbg6 cf|Manage Environments] ➤ 弹窗 [BTNbg6 cf|Add] ➤ ↴background-color:#fff; vertical-align:top; padding:10px
    ↤Environment Name▭{color:#8922ff}environment-name▭    
    ▦⇤VARIABLE(变量)        INITIAL VALUE(初始值)      CURRENT VALUE(当前值) 
        API{color:#26f}  https://api.com:4432  https://api.com:4432
        RES{color:#26f}  https://res.com:4433  https://res.com:4433
    ▦↦ ➤ [BTNbg6 cf|Add]    
    [FORM_END]
■

[###]  需要验证的请求 
■⇤{border:#ccc 1px solid; padding: 10px 0}
    - 登录 
        [FORM_START]
        切换环境：▼environment-name{color:#8922ff}▼
        ▤(vtop)collection-name{color:#ffaa22}[登录(active),上传]▤ ➤ ↴background-color:#f3f3f3; vertical-align:top; padding:10px
        ↤▼POST▼ ▭{{[{color:#26f}API]}}/api/login/▭  [BTN|Send] [BTN|Save]
        
        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        ◉⇤none  form-data  [x-www-form-urlencoded]  raw  binary  GraphQL◉
        ▦⇤KEY        VALUE      DESCRIPTION  
            username   ewan
            password   123456
        ▦↦ ➤ [BTNbg6 cf|Save] ➤ [BTNbg6 cf|Send] ➤ 得到：[{color:#f33}e4fc5eb9-316a-48e5-a970-dc116e7ab897]
        [FORM_END]
■
■⇤{border:#ccc 1px solid; padding: 10px 0}
    - 需要验证的请求
        [FORM_START]
        切换环境：▼environment-name{color:#8922ff}▼
        ▤(vtop)collection-name{color:#ffaa22}[登录,上传(active)]▤ ➤ ↴background-color:#f3f3f3; vertical-align:top; padding:10px
        ↤▼POST▼ ▭{{[{color:#26f}RES]}}/api/cdn/UploadFile/▭  [BTN|Send] [BTN|Save]

        ▥⇤Params  Authorization  [Headers]  Body  Pre-request Script  Tests  Settings▥
        ▦⇤KEY        VALUE      DESCRIPTION  
            authenticate  e4fc5eb9-316a-48e5-a970-dc116e7ab897{color:#f33}
        ▦

        ▥⇤Params  Authorization  Headers  [Body]  Pre-request Script  Tests  Settings▥
        ◉⇤none  form-data  x-www-form-urlencoded  raw  [binary]  GraphQL◉
        [BTNbg6 cf|Select File]↦ ➤ [BTNbg6 cf|Save] ➤ [BTNbg6 cf|Send] 
        [FORM_END]
■
===-