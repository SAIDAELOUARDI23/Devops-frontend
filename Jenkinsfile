pipeline {
    agent any
    tools {
        nodejs "node"
    }
    environment {
        imageName = "saida777/react-app"
        registryCredential = 'saida777'
        dockerImage = ''
    }
    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --passWithNoTests'
            }
        }

        stage('Building Image') {
            steps {
                script {
                    dockerImage = docker.build(imageName)
                }
            }
        }

        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", dockerhub-cred) {
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
