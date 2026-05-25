package com.zw.admin.server.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "external")
public class ExternalServiceProperties {

    private Pentaho pentaho = new Pentaho();
    private Fhir fhir = new Fhir();

    public Pentaho getPentaho() {
        return pentaho;
    }

    public void setPentaho(Pentaho pentaho) {
        this.pentaho = pentaho;
    }

    public Fhir getFhir() {
        return fhir;
    }

    public void setFhir(Fhir fhir) {
        this.fhir = fhir;
    }

    public static class Pentaho {
        private String url;
        private String username;
        private String password;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class Fhir {
        private String host;

        public String getHost() {
            return host;
        }

        public void setHost(String host) {
            this.host = host;
        }
    }
}
