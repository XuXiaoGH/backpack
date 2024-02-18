
// 交易模式
// 0: 简单粗暴模式，直接买卖到你余额归零位置
// 1：按剩余 usdc 的数量，到指定数额停止
// 2：按次数，到指定次数停止
const tradeType = 0;

// 按剩余usdc数，当低于这个数量时候程序会最后一次买入sol进行停止
const stopUsdc = 0;
// 按交易次数停止，你自己设置交易次数
const stopTradeAmout = 100;

let timer;
let counter = 1;
// 自动交易
const trade = async () => {

    let isLastest = false;
    if (tradeType === 1) {
        const balanceArray = document.getElementsByClassName('_ls-167744059')[5].textContent.split(' ');
        const balance = balanceArray[0];
        if (parseFloat(balance) < stopUsdc) {
            console.log(`剩余金额已低于${stopUsdc} usdc，已停止`)
            isLastest = true;
        }
    } else if (tradeType === 2) {
        if (counter === stopTradeAmout) {
            console.log(`程序执行已达到${stopTradeAmout}次数，已停止`)
            isLastest = true;
        }
    }

    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100)); 
    document.getElementsByClassName('bg-greenPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    if (isLastest) {
        console.log('准备停止');
        clearInterval(timer);
        return;
    }

    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    await new Promise(resolve => setTimeout(resolve, 100)); 
    document.getElementsByClassName('_bg-901062054')[3].click();
    await new Promise(resolve => setTimeout(resolve, 100)); 
    document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click()
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    document.getElementsByClassName('border-b-baseBorderMed')[0].click()
    counter++;
}

// 3s 循环一次，想停止，刷新页面即可
timer = setInterval(trade, 5000)


