pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        ONLINE_SITE = 'https://www.abyssal.site/vuetify-boilerplate'
        AUTHOR_EMAIL = 'hongxin.tang@hotmail.com'
        DEPLOY_DIR   = '/www/wwwroot/www'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build' 
            }
        }
        stage('Deploy') {
            steps {
                dir("${DEPLOY_DIR}") {
                    script {
                        if (fileExists('vuetify-boilerplate.back')) {
                            sh 'rm -rf vuetify-boilerplate.back'
                        }
                        if (fileExists('vuetify-boilerplate')) {
                            sh 'mv vuetify-boilerplate vuetify-boilerplate.back'
                        }    
                    }
                    sh 'mv ${WORKSPACE}/dist ./vuetify-boilerplate'
                }
            }
        }
    }
    post {
        always {
            emailext body: "View on ${ONLINE_SITE}, See detail at ${BUILD_URL}",
                    recipientProviders: [developers(), requestor()],
                    subject: "Jenkins: ${JOB_NAME} ${GIT_BRANCH} build ${currentBuild.result}",
                    to: "${AUTHOR_EMAIL}"
        }
    }
}
