import Browser from 'webextension-polyfill';
import { localExtStorage } from '@webext-core/storage';

const statusElement = document.querySelector<HTMLParagraphElement>('#status')!;
function updateStatus(colorName: string | null) {
  statusElement.innerText = `Last color: ${colorName}`;
}

Browser.storage.onChanged.addListener(changes => {
  updateStatus(changes.lastColor.newValue);
});

localExtStorage.getItem<string>('lastColor').then(updateStatus);
