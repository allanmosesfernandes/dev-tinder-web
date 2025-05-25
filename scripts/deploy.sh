echo "Copying build files to Nginx directory..."
cp -r /tmp/codepipeline-artifacts/dist/* /var/www/html/
echo "Restarting Nginx..."
systemctl restart nginx
echo "Deployment completed!"