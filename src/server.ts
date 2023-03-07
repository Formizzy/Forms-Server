import app from './app';

app.listen(3000, () => {
    console.log(`server running on port : ${3000}`);
  })
  .on('error', (e : any) => console.log(e));
