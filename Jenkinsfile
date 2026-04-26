pipeline {
    agent any

    environment {
        BUILD_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build User Service') {
            steps {
                sh 'docker build -t rshubham07/user-service:${BUILD_TAG} ./user-service'
            }
        }

        stage('Push User Service') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push rshubham07/user-service:${BUILD_TAG}'
                }
            }
        }

        stage('Build Product Service') {
            steps {
                sh 'docker build -t rshubham07/product-service:${BUILD_TAG} ./product-service'
            }
        }

        stage('Push Product Service') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push rshubham07/product-service:${BUILD_TAG}'
                }
            }
        }

        stage('Deploy User Service') {
            steps {
                sh 'kubectl set image deployment/user-service user=rshubham07/user-service:${BUILD_TAG}'
            }
        }

        stage('Deploy Product Service') {
            steps {
                sh 'kubectl set image deployment/product-service product=rshubham07/product-service:${BUILD_TAG}'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
	success {
            sh 'docker pull rshubham07/user-service:${BUILD_TAG}'
            sh 'docker pull rshubham07/product-service:${BUILD_TAG}'
        }
    }
}
