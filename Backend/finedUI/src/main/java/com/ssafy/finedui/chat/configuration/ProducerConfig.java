package com.ssafy.finedui.chat.configuration;

import com.fasterxml.jackson.databind.JsonSerializable;
import com.ssafy.finedui.chat.model.Message;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
public class ProducerConfig {
    @Bean
    public ProducerFactory<String, Message> producerFactory(){
        return new DefaultKafkaProducerFactory<>(producerConfigurations());
    }

    @Bean
    public Map<String,Object> producerConfigurations(){
        Map<String,Object>configurations = new HashMap<>();
        configurations.put(org.apache.kafka.clients.producer.ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,"localhost:9092");
        configurations.put(org.apache.kafka.clients.producer.ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configurations.put(org.apache.kafka.clients.producer.ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializable.class);
        return configurations;
    }

    @Bean
    public KafkaTemplate<String,Message> kafkaTemplate(){
        return new KafkaTemplate<>(producerFactory());
    }
}
