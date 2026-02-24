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

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    video.onloadeddata = () => {
      this.isLoading = false;
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
}
