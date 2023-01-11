let gl, slc

window.addEventListener('load', () => {
    /* 其标准大小：行宽为10，列高为20 */

    const monitor = document.querySelector('.monitor')
    const notice = document.querySelector('.notice')
    const uiContainer = document.querySelector('.ui-container')
    const scoreTxt = document.querySelector('.ui-container .txt:nth-of-type(2)')
    const levelTxt = document.querySelector('.ui-container .txt:nth-of-type(4)')
    const ctx = monitor.getContext('2d')
    const ctx2 = notice.getContext('2d')

    // 用于数据回显的元素
    window.inputs = document.querySelectorAll('input')

    // 加载config
    loadScript('./js/config.js', () => {
        initScreen()

        // 数据回显
        inputs[0].value = config.control.left
        inputs[1].value = config.control.right
        inputs[2].value = config.control.down
        inputs[3].value = config.control.turn
        inputs[4].value = config.game.startLevel
        inputs[5].value = config.game.levelUpScore


        // config 加载完后 加载 block
        loadScript('./js/block.js', () => {
            // block 加载完后 加载 gl 和 slc
            loadScript('./js/logic.js', () => {
                gl = new GameLogic(config, ctx, ctx2)
                // gl.start()
            })
            loadScript('./js/scoreLevelCounter.js', () => {
                slc = new ScoreLevelCounter(config, scoreTxt, levelTxt)
            })
        })
    })


    // 初始化屏幕
    function initScreen() {
        monitor.width = config.monitor.w * config.block.size
        monitor.height = config.monitor.h * config.block.size
        notice.width = 4 * config.block.size
        notice.height = 4 * config.block.size
        uiContainer.style.paddingTop = monitor.offsetTop + 'px'
    }
})


function loadScript(url, onload) {
    const script = document.createElement('script')
    script.src = url
    script.addEventListener('load', () => {
        if (onload && typeof onload === 'function')
            onload()
    })
    document.body.appendChild(script)
}