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
                script {
                    bat 'npm test -- --passWithNoTests'
                }
            }
        }
    }
}
