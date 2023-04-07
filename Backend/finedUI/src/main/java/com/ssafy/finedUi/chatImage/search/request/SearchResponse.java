package com.ssafy.finedUi.chatImage.search.request;

import com.ssafy.finedUi.db.entity.RegistInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResponse {
    Long id;
    String url;
    float score;

    String name;

    Integer birthDate;


    @Override
    public String toString() {
        return "SearchResponse{" +
                "id=" + id +
                ", url='" + url + '\'' +
                ", score=" + score +
                '}';
    }
}
