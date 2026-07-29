package com.farmverse.farmverse_backend.service;

import com.farmverse.farmverse_backend.dto.ReportRequest;
import com.farmverse.farmverse_backend.entity.Report;

import java.util.List;

public interface ReportService {

    String addReport(ReportRequest request);

    List<Report> getAllReports();

    Report getReportById(Integer reportId);

    String updateReport(Integer reportId, ReportRequest request);

    String deleteReport(Integer reportId);
}
