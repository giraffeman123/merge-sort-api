#!/bin/bash

#we enable the service, start it and check status
sudo systemctl enable merge-sort-app
sudo systemctl start merge-sort-app
sudo systemctl status merge-sort-app