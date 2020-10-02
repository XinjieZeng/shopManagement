package com.example.o2o.entity;

import org.springframework.web.bind.annotation.RequestMapping;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name="tb_area")
public class Area {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer areaId;
	private String areaName;
	private Integer priority;
	private Date createTime;
	private Date lastEditTime;

	public Integer getAreaId() {
		return areaId;
	}

	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(Date lastEditTime) {
		this.lastEditTime = lastEditTime;
	}

}