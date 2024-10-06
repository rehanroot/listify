package com.listify.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.listify.mariarepository", // MariaDB repositories
        entityManagerFactoryRef = "mariaEntityManagerFactory",
        transactionManagerRef = "mariaTransactionManager"
)
public class MariaDBConfig {

    @Bean(name = "mariaDataSource")
    public DataSource mariaDataSource() {
        return DataSourceBuilder.create()
                .driverClassName("org.mariadb.jdbc.Driver")
                .url("jdbc:mariadb://127.0.0.1:3309/listify")
                .username("root")
                .password("Prithibi420@")
                .build();
    }

    @Bean(name = "mariaEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean mariaEntityManagerFactory(
            @Qualifier("mariaDataSource") DataSource mariaDataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(mariaDataSource);
        em.setPackagesToScan("com.listify.mariamodel");  // Ensure this points to your entity package

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.dialect", "org.hibernate.dialect.MariaDBDialect");
        properties.put("hibernate.hbm2ddl.auto", "create"); // Ensure schema creation
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean(name = "mariaTransactionManager")
    public PlatformTransactionManager mariaTransactionManager(
            @Qualifier("mariaEntityManagerFactory") LocalContainerEntityManagerFactoryBean mariaEntityManagerFactory) {
        return new JpaTransactionManager(mariaEntityManagerFactory.getObject());
    }
}
