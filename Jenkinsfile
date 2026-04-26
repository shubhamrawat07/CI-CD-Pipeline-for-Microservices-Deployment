pipeline {
    agent any

    environment {
        DOCKER_IMAGE_USER = "rshubham07/user-service:latest"
        DOCKER_IMAGE_PRODUCT = "rshubham07/product-service:latest"
    }

    stages {
        stage('Build User Service') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_USER ./user-service'
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
                    sh 'docker push $DOCKER_IMAGE_USER'
                }
            }
        }

        stage('Build Product Service') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE_PRODUCT ./product-service'
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
                    sh 'docker push $DOCKER_IMAGE_PRODUCT'
                }
            }
        }

        stage('Deploy User Service') {
            steps {
                sh 'kubectl set image deployment/user-service user-service=$DOCKER_IMAGE_USER'
            }
        }

        stage('Deploy Product Service') {
            steps {
                sh 'kubectl set image deployment/product-service product-service=$DOCKER_IMAGE_PRODUCT'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
