server {
  listen 80;

  server_name server.com;

  location / {
     proxy_pass http://0.0.0.0:7005;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-Proto $scheme;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_cache_bypass $http_upgrade;
  }

  access_log /var/www/server/access.log;
  error_log /var/www/server/error.log;

}
