module.exports = shipit => {
  // Load shipit-deploy tasks
  // require('shipit-deploy')(shipit)

  const appName = 'app-server'
  const destFolder = '/var/www/app-server'
  const domain = 'server.com'

  shipit.initConfig({
    default: {
      branch: 'master',
      deployTo: destFolder
    },
    staging: {
      servers: 'root@IP_ADDRESS',
      workspace: destFolder
    },
  });

  shipit.task('deploy', async() => {
    await shipit.copyToRemote('.', destFolder)
    await shipit.copyToRemote(`./conf/${domain}`, `/etc/nginx/sites-enabled/${domain}`)
  })

  shipit.task('restart', async() => {
    await shipit.remote(`cd ${destFolder} && cp .env-prod .env && pm2 start ${appName} && service nginx restart`)
  })

  shipit.task('logs', async() => {
    await shipit.remote(`pm2 logs ${appName}`)
  })

  shipit.task('serve', async() => {
    await shipit.remote(`cd ${destFolder} && cp .env-prod .env && pm2 start server.js --name ${appName}`)
  })

  shipit.task('install', async() => {
    await shipit.remote('apt-get update')
    await shipit.remote('curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh')
    await shipit.remote('bash nodesource_setup.sh')
    await shipit.remote('sudo apt-get install -y nodejs && sudo apt-get install -y build-essential')
    await shipit.remote('npm install -g pm2')
  })

}
