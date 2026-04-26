pipeline {
    agent any

    environment {
        DOCKERHUB = "rshubham07"
    }

    stages {

        stage('Build User Service') {
            steps {
                sh 'docker build -t $DOCKERHUB/user-service:latest ./user-service'
            }
        }

        stage('Push User Service') {
            steps {
                sh 'docker push $DOCKERHUB/user-service:latest'
            }
        }

        stage('Deploy User Service') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
