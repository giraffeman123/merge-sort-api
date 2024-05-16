echo on
cd "C:\Users\ellio\Desktop\LeetCode Problems\Problem-11"
docker stop merge-sort-app
docker rm merge-sort-app
docker rmi merge-sort
docker build -t merge-sort . 
docker-compose up -d 