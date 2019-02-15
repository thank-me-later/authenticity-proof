FROM ethereum/client-go

RUN touch ./pw.txt

ENTRYPOINT [ "geth",\
  "--dev",\
  "--password", "./pw.txt",\
  "--ws",\
  "--wsaddr", "0.0.0.0",\
  "--wsorigins", "*",\
  "--wsapi", "net,eth,ssh,web3"]