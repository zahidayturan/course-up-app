package com.example.courseup.model.DTO;

import com.example.courseup.model.CourseStages;
import lombok.Data;

@Data
public class CourseStagesDTO {

    private Long id;
    private String name;
    private String description;
    private Integer episodeNumber;
    private Double duration;

    public CourseStagesDTO(CourseStages courseStages) {
        this.id = courseStages.getId();
        this.name = courseStages.getName();
        this.description = courseStages.getDescription();
        this.episodeNumber = courseStages.getEpisode();
        this.duration = courseStages.getDuration();
    }
}
