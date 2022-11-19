import { sendMessage1, sendMessage2 } from './utils/messaging';

function getMessageElements(id: string) {
  const parent = document.getElementById(id)!;
  return [
    parent.querySelector<HTMLButtonElement>('button')!,
    parent.querySelector<HTMLPreElement>('pre')!,
  ] as const;
}

const [sleepButton, sleepPre] = getMessageElements('sleep');
const [pingButton, pingPre] = getMessageElements('ping');
const [ping2Button, ping2Pre] = getMessageElements('ping2');
const [throwButton, throwPre] = getMessageElements('throw');
const [unknownButton, unknownPre] = getMessageElements('unknown');

sleepButton.addEventListener('click', async () => {
  sleepPre.innerText = 'Loading...';
  const res = await sendMessage1('sleep', 1000).catch(err => ({ err: err.message }));
  sleepPre.innerText = JSON.stringify(res, null, 2);
});

pingButton.addEventListener('click', async () => {
  pingPre.innerText = 'Loading...';
  const res = await sendMessage1('ping', undefined).catch(err => ({ err: err.message }));
  pingPre.innerText = JSON.stringify(res, null, 2);
});

ping2Button.addEventListener('click', async () => {
  ping2Pre.innerText = 'Loading...';
  const res = await sendMessage2('ping2', 'pong2').catch(err => ({ err: err.message }));
  ping2Pre.innerText = JSON.stringify(res, null, 2);
});

throwButton.addEventListener('click', async () => {
  throwPre.innerText = 'Loading...';
  const res = await sendMessage2('throw', undefined).catch(err => ({ err: err.message }));
  throwPre.innerText = JSON.stringify(res, null, 2);
});

unknownButton.addEventListener('click', async () => {
  unknownPre.innerText = 'Loading...';
  // @ts-expect-error: Testing what happens when an unknown key is passed in
  const res = await sendMessage2('unknown', undefined).catch(err => ({ err: err.message }));
  unknownPre.innerText = JSON.stringify(res, null, 2);
});
