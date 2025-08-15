import { getMathService } from '../../utils/math-service';

function getMathServiceElements(id: string) {
  const parent = document.getElementById(id)!;
  return [
    parent.querySelector<HTMLButtonElement>('button')!,
    parent.querySelector<HTMLPreElement>('pre')!,
  ] as const;
}

const [addButton, addPre] = getMathServiceElements('add');
const [subtractButton, subtractPre] = getMathServiceElements('subtract');
const [multiplyButton, multiplyPre] = getMathServiceElements('multiply');
const [divideButton, dividePre] = getMathServiceElements('divide');
const [factorialButton, factorialPre] = getMathServiceElements('factorial');

const MathService = getMathService();

addButton.addEventListener('click', async () => {
  addPre.innerText = 'Loading...';
  const res = await MathService.add(1, 2).catch(err => ({ err: err.message }));
  addPre.innerText = JSON.stringify(res, null, 2);
});

subtractButton.addEventListener('click', async () => {
  subtractPre.innerText = 'Loading...';
  const res = await MathService.subtract(2, 1).catch(err => ({ err: err.message }));
  subtractPre.innerText = JSON.stringify(res, null, 2);
});

multiplyButton.addEventListener('click', async () => {
  multiplyPre.innerText = 'Loading...';
  const res = await MathService.multiply(2, 3).catch(err => ({ err: err.message }));
  multiplyPre.innerText = JSON.stringify(res, null, 2);
});

divideButton.addEventListener('click', async () => {
  dividePre.innerText = 'Loading...';
  const res = await MathService.divide(1, 0).catch(err => ({ err: err.message }));
  dividePre.innerText = JSON.stringify(res, null, 2);
});

factorialButton.addEventListener('click', async () => {
  factorialPre.innerText = 'Loading...';
  const res = await MathService.factorial(100).catch(err => ({ err: err.message }));
  factorialPre.innerText = JSON.stringify(res, null, 2);
});
