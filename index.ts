import "./plugin";
import {
  $ExternalFetchHandle,
  ImpactStyle,
  NotificationType,
  barcodeScannerPlugin,
  dwebServiceWorker,
} from "./plugin";
const statusBar = document.querySelector("dweb-status-bar")!;
const barcodeScanner = document.querySelector("dweb-barcode-scanning")!;
const handleSubmit = async ($event: Event) => {
  $event.preventDefault();

  const target = document.getElementById("fileToUpload") as HTMLInputElement;
  if (target && target.files?.[0]) {
    const img = target.files[0];
    alert(await barcodeScannerPlugin.process(img));
  }
};

const startScanning = async () => {
  barcodeScanner.startScanning();
};

async function statusBarGetColor() {
  alert((await statusBar.getState()).color);
}

async function hideStatusBar() {
  statusBar.hide();
}

async function showStartBar() {
  statusBar.show();
}
statusBar.addEventListener("statechange", (event) => {
  console.log("statechange=>", event);
});

const virtualKeyBoard = document.querySelector("dweb-virtual-keyboard")!;
// 监听状态变化
virtualKeyBoard.addEventListener("statechange", (event) => {
  console.log("virtualKeyBoard#statechange=>", event);
});

const haptics = document.querySelector("dweb-haptics")!;

const impactLight = async () => {
  await haptics.impactLight({ style: ImpactStyle.Heavy });
};
const notification = async () => {
  await haptics.notification({ type: NotificationType.Success });
};

const share = document.querySelector("dweb-share")!;
// 分享
const shareHandle = async () => {
  return await share.share({
    title: "分享标题🍉",
    text: "分享文字分享文字",
    url: "https://gpt.waterbang.top",
    files: undefined,
  });
};

const toast = document.querySelector("dweb-toast")!;

// 显示
const showToast = async () => {
  await toast.show({ text: "我是toast🍓", duration: "short" });
};

const device = document.querySelector("dweb-device")!;
const getUUID = async () => {
  console.log(await device.getUUID());
};

const mwebview = document.querySelector("dweb-mwebview")!;

const open = async () => {
  mwebview.open("https://docs.dweb-browser.org/");
};

let res: $ExternalFetchHandle | null = null;
// 向desktop.dweb.waterbang.top.dweb 发送消息
const sayHi = async (message = "今晚吃螃🦀️蟹吗？") => {
  const input = document.getElementById("input1") as HTMLInputElement;
  const data = input.value;
  console.log("sayHi=>", data);
  if (data) {
    message = data;
  }
  const url = new URL("/say/hi",document.baseURI);
  url.searchParams.set("message", message);
  const res = await dwebServiceWorker.externalFetch(
    `game.dweb.waterbang.top.dweb`,
    url
  );
  console.log("收到回应消息 => ", await res.text());
};

const canOpenUrl = async () => {
  const res = await dwebServiceWorker.canOpenUrl(
    `game1.dweb.waterbang.top.dweb`
  );
  console.log("canOpenUrl=>", res);
};

dwebServiceWorker.addEventListener("fetch", async (event) => {
  console.log("Dweb Service Worker fetch!", event);
  const url = new URL(event.request.url);
  if (url.pathname.endsWith("/say/hi")) {
    const hiMessage = url.searchParams.get("message");
    console.log(`收到:${hiMessage}`);
    // 发送消息回去
    return event.respondWith(`我是plaoc-html-demo 我接收到了消息`);
  }
  return event.respondWith("Not match any routes");
});

Object.assign(globalThis, {
  sayHi,
  canOpenUrl,
  statusBarGetColor,
  handleSubmit,
  hideStatusBar,
  startScanning,
  showStartBar,
  dwebServiceWorker,
});
