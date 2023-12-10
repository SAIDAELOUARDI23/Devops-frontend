pipeline {
    agent any
    tools {
        nodejs "node"
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
                    bat 'docker build -t devops/react-frontend .'
                }
            }
        }

        stage('Push Image To Hub') {
            steps {
                script {
                    bat 'docker login -u saida777 -p Pa171709@'
                    bat 'docker tag devops/react-frontend saida777/ss:devops-springboot-backend'
                    bat 'docker push saida777/ss:devops-springboot-backend'
                }
            }
        }
    }
}

