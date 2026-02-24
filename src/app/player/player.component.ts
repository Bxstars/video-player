import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  standalone: false,
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  isPlaying: boolean = false;
  isMuted: boolean = false;
  isDarkMode: boolean = false;
  isBig: boolean = false;
  isLoading: boolean = true;
  isEnded: boolean = false;

  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;
  isDragging: boolean = false;

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    video.onloadeddata = () => {
      this.isLoading = false;
    };

    video.onended = () => {
      this.isEnded = true;
      this.isPlaying = false;
    };

    video.onloadedmetadata = () => {
      this.duration = video.duration;
    };

    video.ontimeupdate = () => {
      if (!this.isDragging) {
        this.currentTime = video.currentTime;
        this.progress = (video.currentTime / video.duration) * 100;
      }
    };
  }

  togglePlay() {
    const video = this.videoRef.nativeElement;

    console.log('togglePlay called. Current state:', {
      paused: video.paused,
      currentTime: video.currentTime,
      isPlaying: this.isPlaying,
      isEnded: this.isEnded,
    });

    if (video.paused) {
      video.play();
      this.isPlaying = true;
      this.isEnded = false;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  rewind10(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    video.currentTime = Math.max(video.currentTime - 10, 0);
  }

  forward10(): void {
    const video = this.videoRef?.nativeElement;
    if (!video) return;

    video.currentTime = Math.min(
      video.currentTime + 10,
      video.duration || video.currentTime + 10,
    );
  }

  forward() {
    const video = this.videoRef.nativeElement;
    video.playbackRate = video.playbackRate === 1 ? 2 : 1;
  }

  toggleMute() {
    const video = this.videoRef.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }

  toggleSize() {
    this.isBig = !this.isBig;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark-mode');
  }

  onProgressBarClick(event: MouseEvent) {
    const video = this.videoRef.nativeElement;
    const bar = event.currentTarget as HTMLElement;

    if (!video.duration) return;

    const percent = this.calculateProgress(event, bar);
    const newTime = percent * video.duration;

    this.progress = percent * 100;
    this.currentTime = newTime;
    video.currentTime = newTime;
  }

  startDrag(): void {
    this.isDragging = true;
  }

  drag(event: MouseEvent): void {
    if (!this.isDragging) return;

    const video = this.videoRef.nativeElement;
    const bar = (event.target as HTMLElement).closest(
      '.progress',
    ) as HTMLElement;

    if (!bar || !video.duration) return;

    const percent = this.calculateProgress(event, bar);

    const newTime = percent * video.duration;

    this.progress = percent * 100;
    this.currentTime = newTime;
    video.currentTime = newTime;
  }

  private calculateProgress(event: MouseEvent, bar: HTMLElement): number {
    const rect = bar.getBoundingClientRect();
    let percent = (event.clientX - rect.left) / rect.width;

    percent = Math.max(0, Math.min(1, percent));
    return percent;
  }

  stopDrag(): void {
    this.isDragging = false;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
