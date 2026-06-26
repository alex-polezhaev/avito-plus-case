console.log('Restart container');
fetch('https://api-ms.netangels.ru/api/v1/hosting/virtualhosts/244706/restart/', {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${process.env.NET_ANGELS_TOKEN}`,
  },
})
  .catch((e) => {
    console.error(e);
    console.error("Can't restart container");
  });
