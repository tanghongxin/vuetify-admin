pipeline {
    agent any
    options {
        timestamps()
    }
    environment {
        ONLINE_SITE = 'https://vuetify-boilerplate.abyssal.site'
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
                dir('/usr/share/nginx') {
                    sh 'rm -rf vuetify-boilerplate.back'
                    sh 'mv vuetify-boilerplate vuetify-boilerplate.back' 
                    sh 'mv ${WORKSPACE}/dist .'
                    sh 'mv dist vuetify-boilerplate'
                }
            }
        }
    }
    post {
        always {
            emailext body: "View on ${ONLINE_SITE}, See detail at ${BUILD_URL}",
                    recipientProviders: [developers(), requestor()],
                    subject: "Jenkins: ${JOB_NAME} ${GIT_BRANCH} build ${currentBuild.result}",
                    to: 'hongxin.tang@hotmail.com'
        }
    }
}
