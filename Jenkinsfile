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

        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker build -t 2048 ."
                       sh "docker tag 2048 saida777/2048:latest "
                       sh "docker push saida777/2048:latest "
                    }
                }
            }
        }
        
        stage("TRIVY"){
            steps{
                sh "trivy image saida777/2048:latest > trivy.txt" 
            }
        }
        stage('Deploy to container'){
            steps{
                sh 'docker stop 2048'
                sh 'docker rm 2048'
                sh 'docker run -d --name 2048 -p 3000:3000 saida777/2048:latest'
            }
        }
        stage('Deploy to kubernets'){
            steps{
                script{
                    withKubeConfig(caCertificate: 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUVMRENDQXBTZ0F3SUJBZ0lRSktQS3l4Q2lVWkNQK2NPaGVhM0R5ekFOQmdrcWhraUc5dzBCQVFzRkFEQXYKTVMwd0t3WURWUVFERXlSaE5UVTNOVEJtTkMweVpXUmtMVFJrTldZdE9EUmlOaTFsTm1WbFl6STNOREV3WXpRdwpJQmNOTWpNeE1qSTNNVFF6T0RBeVdoZ1BNakExTXpFeU1Ua3hOVE00TURKYU1DOHhMVEFyQmdOVkJBTVRKR0UxCk5UYzFNR1kwTFRKbFpHUXROR1ExWmkwNE5HSTJMV1UyWldWak1qYzBNVEJqTkRDQ0FhSXdEUVlKS29aSWh2Y04KQVFFQkJRQURnZ0dQQURDQ0FZb0NnZ0dCQUtoK1o5NnNoa1RTUE5YckFoaWJGWHM4NGNITmMrMHUzN1FkczBObAplMm92NExtTExTNS9vSWl0ejdsbllod1JoTGF6Z3pLcHhoTWxrM0lOS3JOaVEzTmZNa3ZveU1vYW9yMU1kbS9jCk0xNS9xTkxzbFcvbytTS2FGeGoxT2UzMXhPMHBMQk95WE1hTm9XNk5mYTJPbms5Nk5Uc25QNEc3RWt0NDVNMmIKVVNuSHYwSGVjRDJOT0R1SDVCSmwvNHc4anRoL3d1ZDJmNnhWUjlod2RCcjNTVVJOQWY1Rk4zMlJ3NFdHSjN4UQp3bzV2REFaK1pIOXFyYXlUYlE3d2tWZlhpdGlLOThFRDJON3VkY0lVb3VvUFd1ZmRvelIvTFRISFREaGJpdWhxClBQejJCdFJ0a0ZaSFNlZlZIMGtlZTN5b1NuQSt2REJvTW9zZ010aTVmejQzcTFLQi93ZUVHbUQvd09vQkZXQTMKVU0yMDNXYldQRVBYUFR5a2ZqaUdWZkYxa2tSUWpIaGhTcEZJVGhNcFRWOWpvLzRnd0NBN0ZjZm5sK3RwYlJSdQp4Yms1Rmo1OXJDR1NLcmh2OFhUQVpYU3dPbXJWUGJ2aG5GTndWZEN6YXRFSXRRbS9pWmZMQkJvNkt4aXRkY0UwCnJxNzJBY2dtdnVLL1VXVkRILytVRTR0N1F3SURBUUFCbzBJd1FEQU9CZ05WSFE4QkFmOEVCQU1DQWdRd0R3WUQKVlIwVEFRSC9CQVV3QXdFQi96QWRCZ05WSFE0RUZnUVVvM00vMmN3b3hVa1ZoS2dQTll0d0Z0VE5pRW93RFFZSgpLb1pJaHZjTkFRRUxCUUFEZ2dHQkFIWkdCVFZ6YkxieDhteTIwMkJGaW9yUHJ3QXNodWJzR0poTE1aYTMwdmg5CjkzdkJoSWpIUHJPSVFvTVU0SDlGMi9LN0FDcG9JMFFsMUZNakJkOGdtZVoram5LeUJNdFdlSE5jMUw5dWhNcXYKR3NFMXQzbnUyNS8wbktlTW1nc1g2WXBGZVA3eVg0UEcvb1BFSEk1S1dod25jc2hZanNRVnUwa3ZGTHE2VkJmYQpHRGRLTC9JRTFDY2lUVGlRNHRYZmJPVGJEc1RZOUhPR0Y2Y05zbmU3WFMvQ21iSnAybVdBUVh2T3dodnd3Qnl5Cm14dm9wd2FBbGkyV291a0J3U3h3OVpsNUVLK3Q1WlpiVkRzNUxRUVJsZ1EzT2lZQ04vVzJuZE9VaGQ2Sy9LYXgKZWpCdmFMT0xTZzljZktCc0ZxMjlWVmNYMXdkK3R2dGRhRDhMYXJyamIraCtRL0drV3dWckQ3Z3Z4RUlPeVFYMwpCNkNVdUI3eWppc0thOS9CQXZkSlVDd0NmZ1c3ektLQ1hoNDNuczhaMDlQczFBYnhIdGMwR1Y1V0pTaGY5M1dwCnBVMlN3K2NhbjhRYzBwRnNuaVlaUkttOFo2Si92c1dUL1Jtai9nMUxHMjFQZ05udzAvUEZhcXdENVdEL3djUDkKM3lvbWVUSENScjNnYmdjbXpVTEYzdz09Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K', clusterName: 'gke_endless-anagram-409401_us-central1_frontendcluster', contextName: 'gke_endless-anagram-409401_us-central1_frontendcluster', credentialsId: 'k8s', namespace: '', restrictKubeConfigAccess: false, serverUrl: 'https://34.16.1.63') {
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
   
