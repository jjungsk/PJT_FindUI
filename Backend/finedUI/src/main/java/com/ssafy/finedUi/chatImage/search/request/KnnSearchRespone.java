package com.ssafy.finedUi.chatImage.search.request;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;


@Getter
public class KnnSearchRespone {

    List<SearchResponse> results;

    public KnnSearchRespone() {
        results = new ArrayList<>();
    }

}
