module.exports = {
  apps : [{
    name: 'nodeDeployfe',
    script: 'index.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root-mission',
      host : '154.8.204.98',
      ref  : 'origin/master',
      repo : 'git@github.com:mission-sun/mission-blog-koa.git',
      path : '/home/root-mission/blog/web-mobile',
      'pre-deploy': "git fetch",
      'post-deploy' : 'bash build.sh'
    }
  }
};

// 'post-deploy' : 'npm install --registry=https://registry.npm.taobao.org && npm run build && rm -rf ./../../dist-mobile && mkdir dist-mobile && mv dist dist-mobile && mv -f ../dist-mobile ./../../'

// 'post-deploy' : 'npm install && npm run build && pm2 start build.sh  --interpreter bash'
