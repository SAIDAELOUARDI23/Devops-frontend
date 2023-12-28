pipeline{
    agent any
    tools{
        jdk 'java17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME=tool 'sonarqube-scanner'
    }
    stages {
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.organization=wm-demo0 -Dsonar.projectKey=wm-demo0_front-end-devsecop -Dsonar.sources=. -Dsonar.host.url=https://sonarcloud.io'''
                }
            }
        }
        stage("Quality gate"){
           steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 
                }
            } 
        }
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        stage('OWASP SCAN') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

       stage('Deploy to container'){
    steps{
        sh 'docker stop 2048 || true'  // Stop the container if it's running (ignore errors if not running)
        sh 'docker rm 2048 || true'    // Remove the container (ignore errors if not present)
        sh 'docker run -d --name 2048 -p 3000:3000 saida777/2048:latest'
    }
}

        
        stage("TRIVY"){
            steps{
                sh "trivy image saida777/2048:latest > trivy.txt" 
            }
        }
        stage('Deploy to container'){
            steps{
                sh 'docker run -d --name 2048 -p 3000:3000 saida777/2048:latest'
            }
        }
        stage('Deploy to kubernets'){
            steps{
                script{
                    withKubeConfig(caCertificate: '', clusterName: '', contextName: '', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: '') {
                       sh 'kubectl apply -f deployment.yaml'
                  }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
   
