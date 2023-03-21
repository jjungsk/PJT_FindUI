package com.ssafy.fineduichat;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController //데이터 리턴 서버
public class ChatController {
    private final ChatRepository chatRepository;
    @CrossOrigin
    @GetMapping(value = "/sender/{sender}/receiver/{receiver}",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> getMsg(@PathVariable String sender, @PathVariable String receiver){
        return chatRepository.mFindBySender(sender,receiver)
                .subscribeOn(Schedulers.boundedElastic());
    }
    @CrossOrigin
    @GetMapping(value = "/chat/roomNum/{roomNum}",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> findByUsername(@PathVariable Integer roomNum){
        return chatRepository.mFindByRoomNum(roomNum)
                .subscribeOn(Schedulers.boundedElastic());
    }
    @CrossOrigin
    @PostMapping("/chat")
    public Mono<Chat> setMsg(@RequestBody Chat chat){
        chat.setCreatedAt(LocalDateTime.now());
        return chatRepository.save(chat); //Object를 return하면 자동으로 JSON변환(MessageConvertor에 의해서)
    }
}
