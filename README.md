# Sprinkler Node

This project utilizes a raspberry pi attaches to a multi channel relay controller.

## Gettings Started

This setup assumes that you already have Node 8.x and git installed.

1. Log in to your raspberry pi as the pi user
2. Execute the following command:
```
git clone git@github.com:dorgan/sprinkler-node.git
```
3. In order to enable node to use stardard webports 80(http) and 443(https) we need to allow node access to those privleged ports.  To do this run the following command:
```
sudo setcap 'cap_net_bind_service=+ep' `which node`
```
4. Next we want to enable setup and enable the webserver and scheduling services.  To do so execute the following commands:
```
sudo systemctl enable /home/pi/sprinkler-node/scripts/sprinkler-node-web.service
sudo systemctl enable /home/pi/sprinkler-node/scripts/sprinkler-node-scheduler.service
sudo systemctl start sprinkler-node-web
sudo systemctl start sprinkler-node-scheduler
```
