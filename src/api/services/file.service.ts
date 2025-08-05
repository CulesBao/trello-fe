import { $get, $post, $delete } from '../axios.client';
import { API_ENDPOINTS } from '../constants/endpoints';
import type { FileUploadResponse } from '../types/misc';
import type { ApiResponse } from '../types/common';

export class FileService {
  /**
   * Upload file
   */
  static async uploadFile(file: File, folder?: string): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) {
      formData.append('folder', folder);
    }

    const response = await $post<ApiResponse<FileUploadResponse>>(
      API_ENDPOINTS.FILES.UPLOAD,
      formData
    );
    return response.data.data;
  }

  /**
   * Upload multiple files
   */
  static async uploadMultipleFiles(files: File[], folder?: string): Promise<FileUploadResponse[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    if (folder) {
      formData.append('folder', folder);
    }

    const response = await $post<ApiResponse<FileUploadResponse[]>>(
      `${API_ENDPOINTS.FILES.UPLOAD}/multiple`,
      formData
    );
    return response.data.data;
  }

  /**
   * Get file download URL
   */
  static async getDownloadUrl(fileId: string): Promise<string> {
    const response = await $get<ApiResponse<{ url: string }>>(
      API_ENDPOINTS.FILES.DOWNLOAD(fileId)
    );
    return response.data.data.url;
  }

  /**
   * Download file
   */
  static async downloadFile(fileId: string, filename?: string): Promise<void> {
    const downloadUrl = await this.getDownloadUrl(fileId);

    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Delete file
   */
  static async deleteFile(fileId: string): Promise<void> {
    await $delete<ApiResponse<void>>(
      API_ENDPOINTS.FILES.DELETE(fileId)
    );
  }

  /**
   * Upload avatar
   */
  static async uploadAvatar(file: File): Promise<FileUploadResponse> {
    return this.uploadFile(file, 'avatars');
  }

  /**
   * Upload board background
   */
  static async uploadBoardBackground(file: File): Promise<FileUploadResponse> {
    return this.uploadFile(file, 'board-backgrounds');
  }

  /**
   * Upload card cover
   */
  static async uploadCardCover(file: File): Promise<FileUploadResponse> {
    return this.uploadFile(file, 'card-covers');
  }

  /**
   * Validate file before upload
   */
  static validateFile(file: File, options?: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  }): { isValid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options || {}; // 10MB default

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File quá lớn. Kích thước tối đa: ${Math.round(maxSize / 1024 / 1024)}MB`
      };
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${allowedTypes.join(', ')}`
      };
    }

    return { isValid: true };
  }

  /**
   * Get file size in human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get file extension from filename
   */
  static getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  /**
   * Check if file is image
   */
  static isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Check if file is document
   */
  static isDocumentFile(file: File): boolean {
    const documentTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ];
    return documentTypes.includes(file.type);
  }
}

export default FileService;
